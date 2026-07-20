export type ModelMeta = {
  filename: string;
  atividades: number;
  gateways: number;
  pools: number;
};

// Estágio 1
export type Stage1Category = `AP-${string}`;

// Estágio 2
export type Stage2Category =
  | "atividade"
  | "participantes"
  | "modelagem"
  | "dados-mensagens";

export type FindingCategory = Stage1Category | Stage2Category;

export type BpmnElementRef = {
  id: string;
  name?: string;
  type?: string;
};

export type Finding = {
  stage: 1 | 2;
  category: FindingCategory;
  title: string;
  description: string;
  bpmn_element: BpmnElementRef;
  reference: string;
  recommendation: string;
};
