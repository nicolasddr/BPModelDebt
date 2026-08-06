import type { Stage1Category, Stage2Category } from "@/lib/vocab";

export type Antipattern = { code: Stage1Category; text: string };

export const ANTIPATTERNS: Antipattern[] = [
  { code: "AP-01", text: "Atividades em uma piscina não estão conectadas" },
  { code: "AP-02", text: "O processo não contém um evento de fim" },
  { code: "AP-03", text: "Fluxo de sequência cruzando a fronteira de um subprocesso" },
  { code: "AP-04", text: "Fluxo de sequência cruzando a fronteira da piscina" },
  { code: "AP-05", text: "Gateway recebe, avalia e envia uma mensagem" },
  { code: "AP-06", text: "Eventos intermediários colocados na borda da piscina" },
  { code: "AP-07", text: "Eventos ou atividades sem fluxo de entrada" },
  { code: "AP-08", text: "Cada raia na piscina contém um evento de início" },
  { code: "AP-09", text: "Fluxo de exceção não está conectado à exceção" },
  { code: "AP-10", text: "Uso incorreto do fluxo de mensagens entre raias" },
];

export type TechDebt = { code: Stage2Category; text: string };
export type DebtGroup = { label: string; items: TechDebt[] };

export const TECH_DEBTS: DebtGroup[] = [
  {
    label: "Atividade",
    items: [
      { code: "DT-01", text: "Tarefa deveria ser um subprocesso" },
      { code: "DT-02", text: "Subprocesso deveria ser uma tarefa" },
    ],
  },
  {
    label: "Participantes",
    items: [
      {
        code: "DT-03",
        text: "Não representar os atores do processo e suas respectivas responsabilidades (as atividades que cada um executa)",
      },
    ],
  },
  {
    label: "Modelagem",
    items: [
      {
        code: "DT-04",
        text: "Modelo com granularidade errada (muito ou pouco detalhado)",
      },
      {
        code: "DT-05",
        text: "Modelo utiliza notação pouco conhecida (não é BPMN)",
      },
      { code: "DT-06", text: "Não representar o fluxo e o tratamento de exceções" },
      {
        code: "DT-07",
        text: "Não representar todas as decisões e loops do processo",
      },
      { code: "DT-08", text: "Não modelar partes do processo (privado)" },
      {
        code: "DT-09",
        text: "Não decompor as atividades do processo, dificultando a legibilidade",
      },
    ],
  },
  {
    label: "Dados e mensagens",
    items: [
      {
        code: "DT-10",
        text: "Modelo mostra o fluxo de informações, mas não define o que é essa informação: fluxos de mensagem, objetos de dados ou tarefas de serviço sem especificação do conteúdo ou da estrutura dos dados envolvidos",
      },
    ],
  },
];
