export type ModelMeta = {
  filename: string;
  atividades: number;
  gateways: number;
  pools: number;
};

// Estágio 1: código do anti-padrão (Dias 2018). Provisório — falta o codebook
// completo (`Anti_Padroes.md`) para fechar a união em AP-01..AP-10.
export type Stage1Category = `AP-${string}`;

// Estágio 2: vocabulário fechado (seção F do TAREFAS.md).
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
