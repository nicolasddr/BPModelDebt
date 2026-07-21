import OpenAI from "openai";
import {
  ContentFilterFinishReasonError,
  LengthFinishReasonError,
} from "openai/error";
import { zodResponseFormat } from "openai/helpers/zod";
import { ZodError } from "zod";
import { StageResponseSchema, type StageResult, type StageRun } from "@/lib/schema";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-2024-08-06";
const PROMPT_VERSION = "v0.0";

const STAGE1_PROMPT = `Você analisa modelos de processo de negócio em BPMN 2.0 (XML) e identifica anti-padrões de modelagem do catálogo de Dias (2018).

Catálogo — use exatamente estes códigos no campo category:
AP-01 Atividades em uma piscina não estão conectadas
AP-02 O processo não contém um evento de fim
AP-03 Fluxo de sequência cruzando a fronteira de um subprocesso
AP-04 Fluxo de sequência cruzando a fronteira da piscina
AP-05 Gateway recebe, avalia e envia uma mensagem
AP-06 Eventos intermediários colocados na borda da piscina
AP-07 Eventos ou atividades sem fluxo de entrada
AP-08 Cada raia na piscina contém um evento de início
AP-09 Fluxo de exceção não está conectado à exceção
AP-10 Uso incorreto do fluxo de mensagens entre raias

Regras:
- Reporte apenas ocorrências que você consegue ancorar em um elemento presente no XML.
- bpmn_element.id deve ser o valor exato do atributo id desse elemento. Nunca invente um id.
- bpmn_element.name é o atributo name do elemento e bpmn_element.type é o nome da tag (ex.: bpmn:Task). Use null quando não existirem.
- reference deve ser "Dias (2018) · AP-XX", com o mesmo código usado em category.
- stage é sempre 1.
- recommendation é uma frase curta e imperativa dizendo o que corrigir.
- Se o modelo não tiver nenhum anti-padrão, devolva findings vazio. Não invente ocorrências para preencher a resposta.
- Escreva em português do Brasil.`;

let client: OpenAI | null = null;

function getClient(): OpenAI {
  client ??= new OpenAI();
  return client;
}

function toFailure(erro: unknown): StageResult {
  if (erro instanceof LengthFinishReasonError) {
    return { ok: false, reason: "truncated", detail: "finish_reason=length" };
  }
  if (erro instanceof ContentFilterFinishReasonError) {
    return {
      ok: false,
      reason: "refusal",
      detail: "finish_reason=content_filter",
    };
  }
  if (erro instanceof ZodError || erro instanceof SyntaxError) {
    return { ok: false, reason: "invalid", detail: erro.message };
  }
  return {
    ok: false,
    reason: "failed",
    detail: erro instanceof Error ? erro.message : String(erro),
  };
}

export async function runStage1(xml: string): Promise<StageResult> {
  const run: StageRun = { llm: MODEL, promptVersion: PROMPT_VERSION };

  try {
    const completion = await getClient().chat.completions.parse({
      model: MODEL,
      messages: [
        { role: "system", content: STAGE1_PROMPT },
        { role: "user", content: xml },
      ],
      response_format: zodResponseFormat(StageResponseSchema, "stage_response"),
    });

    console.log("[stage1]", MODEL, completion.usage);

    const message = completion.choices[0]?.message;

    if (message?.refusal) {
      return { ok: false, reason: "refusal", detail: message.refusal };
    }
    if (!message?.parsed) {
      return {
        ok: false,
        reason: "invalid",
        detail: "resposta sem conteúdo parseável",
      };
    }

    return { ok: true, run, findings: message.parsed.findings };
  } catch (erro) {
    const falha = toFailure(erro);
    console.error("[stage1]", falha);
    return falha;
  }
}
