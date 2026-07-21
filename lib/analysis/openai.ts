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

const STAGE2_PROMPT = `Você analisa modelos de processo de negócio em BPMN 2.0 (XML) e identifica dívidas técnicas de modelagem: decisões que deixam o modelo utilizável hoje, mas cobram um custo de manutenção e entendimento depois.

Catálogo — use exatamente um destes valores no campo category:

atividade
- Tarefa deveria ser um subprocesso
- Subprocesso deveria ser uma tarefa

participantes
- Não representar os atores do processo e suas respectivas responsabilidades (as atividades que cada um executa)

modelagem
- Modelo com granularidade errada (muito ou pouco detalhado)
- Modelo utiliza notação pouco conhecida (não é BPMN)
- Não representar o fluxo e o tratamento de exceções
- Não representar todas as decisões e loops do processo
- Não modelar partes do processo (privado)
- Não decompor as atividades do processo, dificultando a legibilidade

dados-mensagens
- Modelo mostra o fluxo de informações, mas não define o que é essa informação: fluxos de mensagem, objetos de dados ou tarefas de serviço sem especificação do conteúdo ou da estrutura dos dados envolvidos

Regras:
- Dívida técnica não é erro de sintaxe. Fluxo incorreto, rótulo inapropriado, nome genérico de pool e elemento desconectado são problemas de qualidade, tratados em outro estágio — não os reporte aqui.
- Reporte apenas ocorrências que você consegue ancorar em um elemento presente no XML.
- bpmn_element.id deve ser o valor exato do atributo id desse elemento. Nunca invente um id.
- bpmn_element.name é o atributo name do elemento e bpmn_element.type é o nome da tag (ex.: bpmn:Task). Use null quando não existirem.
- reference deve ser "Categoria: " seguido do mesmo valor usado em category.
- stage é sempre 2.
- description deve dizer qual custo futuro aquela decisão gera, não apenas o que está faltando.
- recommendation é uma frase curta e imperativa dizendo o que corrigir.
- Se o modelo não tiver nenhuma dívida, devolva findings vazio. Não invente ocorrências para preencher a resposta.
- Escreva em português do Brasil.`;

const PROMPTS: Record<1 | 2, string> = {
  1: STAGE1_PROMPT,
  2: STAGE2_PROMPT,
};

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

async function runStage(stage: 1 | 2, xml: string): Promise<StageResult> {
  const run: StageRun = { llm: MODEL, promptVersion: PROMPT_VERSION };
  const tag = `[stage${stage}]`;

  try {
    const completion = await getClient().chat.completions.parse({
      model: MODEL,
      messages: [
        { role: "system", content: PROMPTS[stage] },
        { role: "user", content: xml },
      ],
      response_format: zodResponseFormat(StageResponseSchema, "stage_response"),
    });

    console.log(tag, MODEL, completion.usage);

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
    console.error(tag, falha);
    return falha;
  }
}

export async function runStage1(xml: string): Promise<StageResult> {
  return runStage(1, xml);
}

export async function runStage2(xml: string): Promise<StageResult> {
  return runStage(2, xml);
}
