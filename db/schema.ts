import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const models = pgTable("models", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: text("filename").notNull(),
  bpmnXml: text("bpmn_xml").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const analyses = pgTable("analyses", {
  id: uuid("id").defaultRandom().primaryKey(),
  modelId: uuid("model_id")
    .notNull()
    .references(() => models.id),
  promptVersion: text("prompt_version").notNull(),
  llm: text("llm").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const findings = pgTable("findings", {
  id: uuid("id").defaultRandom().primaryKey(),
  analysisId: uuid("analysis_id")
    .notNull()
    .references(() => analyses.id),
  stage: integer("stage").notNull(), // 1 | 2
  category: text("category").notNull(),
  debtName: text("debt_name").notNull(),
  description: text("description").notNull(),
  causes: text("causes").notNull(),
  consequences: text("consequences").notNull(),
  recommendation: text("recommendation").notNull(),
  bpmnElement: text("bpmn_element"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const evaluations = pgTable("evaluations", {
  id: uuid("id").defaultRandom().primaryKey(),
  findingId: uuid("finding_id")
    .notNull()
    .references(() => findings.id),
  evaluator: text("evaluator").notNull(),
  verdict: text("verdict").notNull(), // correct | incorrect | partial
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
