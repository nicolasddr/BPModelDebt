import type { Finding } from "@/lib/schema";

export const mockFindings: Finding[] = [
  {
    stage: 1,
    category: "AP-04",
    title: "Gateway sem condição explícita",
    description:
      'A divergência de fluxo após "Aprovar crédito" não rotula as saídas do gateway exclusivo, deixando o critério de decisão ambíguo para quem lê o modelo.',
    bpmn_element: {
      id: "ExclusiveGateway_0x4",
      name: "Crédito aprovado?",
      type: "bpmn:ExclusiveGateway",
    },
    reference: "Dias (2018) · AP-04",
    recommendation: "rotular cada fluxo de saída com sua condição",
  },
  {
    stage: 2,
    category: "participantes",
    title: "Responsabilidade ambígua entre pools",
    description:
      'A tarefa "Notificar cliente" aparece sem lane atribuída, com a responsabilidade dividida entre os pools Banco e Analista.',
    bpmn_element: {
      id: "Task_1n9",
      name: "Notificar cliente",
      type: "bpmn:Task",
    },
    reference: "Categoria: participantes",
    recommendation: "mover a tarefa para uma única lane responsável",
  },
  {
    stage: 1,
    category: "AP-07",
    title: "Fim de fluxo implícito",
    description:
      "Um dos ramos do gateway termina sem evento de fim explícito, deixando o encerramento do processo subentendido.",
    bpmn_element: {
      id: "SequenceFlow_2b",
      name: null,
      type: "bpmn:SequenceFlow",
    },
    reference: "Dias (2018) · AP-07",
    recommendation: "adicionar evento de fim ao ramo",
  },
  {
    stage: 1,
    category: "AP-02",
    title: "Convergência de gateway ausente",
    description:
      "Os ramos abertos pelo gateway paralelo após \"Analisar documentos\" não voltam a convergir, deixando o fluxo sem ponto de junção explícito.",
    bpmn_element: {
      id: "ParallelGateway_3f",
      name: null,
      type: null,
    },
    reference: "Dias (2018) · AP-02",
    recommendation: "adicionar gateway de junção correspondente à divergência",
  },
];
