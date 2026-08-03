export const ANTIPATTERNS = [
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
] as const;

export type DebtGroup = { label: string; items: string[] };

export const TECH_DEBTS: DebtGroup[] = [
  {
    label: "Atividade",
    items: [
      "Tarefa deveria ser um subprocesso",
      "Subprocesso deveria ser uma tarefa",
    ],
  },
  {
    label: "Participantes",
    items: [
      "Não representar os atores do processo e suas respectivas responsabilidades (as atividades que cada um executa)",
    ],
  },
  {
    label: "Modelagem",
    items: [
      "Modelo com granularidade errada (muito ou pouco detalhado)",
      "Modelo utiliza notação pouco conhecida (não é BPMN)",
      "Não representar o fluxo e o tratamento de exceções",
      "Não representar todas as decisões e loops do processo",
      "Não modelar partes do processo (privado)",
      "Não decompor as atividades do processo, dificultando a legibilidade",
    ],
  },
  {
    label: "Dados e mensagens",
    items: [
      "Modelo mostra o fluxo de informações, mas não define o que é essa informação: fluxos de mensagem, objetos de dados ou tarefas de serviço sem especificação do conteúdo ou da estrutura dos dados envolvidos",
    ],
  },
];
