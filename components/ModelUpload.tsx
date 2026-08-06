"use client";

import type { ChangeEvent, DragEvent, MouseEvent } from "react";
import { useRef, useState } from "react";
import {
  IconArrowRight,
  IconFileTypeXml,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/Button";
import {
  ACCEPT_ATTR,
  ACCEPTED_EXTENSIONS,
  formatFileSize,
  hasAcceptedExtension,
  INVALID_FORMAT_MESSAGE,
} from "@/lib/upload";

export function ModelUpload({
  uploading,
  error,
  onAnalisar,
}: {
  uploading: boolean;
  error: string | null;
  onAnalisar: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [invalido, setInvalido] = useState(false);
  const [arrastando, setArrastando] = useState(false);

  function selecionar(escolhido: File | undefined) {
    if (!escolhido) return;

    if (!hasAcceptedExtension(escolhido.name)) {
      setFile(null);
      setInvalido(true);
      return;
    }

    setFile(escolhido);
    setInvalido(false);
  }

  function limpar(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFile(null);
    setInvalido(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function aoSoltar(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setArrastando(false);
    selecionar(e.dataTransfer.files[0]);
  }

  function aoArrastarSobre(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setArrastando(true);
  }

  function aoSairDoArrasto(e: DragEvent<HTMLDivElement>) {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setArrastando(false);
  }

  function aoEscolher(e: ChangeEvent<HTMLInputElement>) {
    selecionar(e.target.files?.[0]);
  }

  const mensagem = invalido ? INVALID_FORMAT_MESSAGE : error;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (file) onAnalisar(file);
      }}
      className="mx-auto mt-14 w-full max-w-[460px] rounded-xl border border-border bg-s2 px-7 py-7"
    >
      <h1 className="text-center text-[19px] font-medium">
        Envie seu modelo BPMN
      </h1>

      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={aoArrastarSobre}
        onDragOver={aoArrastarSobre}
        onDragLeave={aoSairDoArrasto}
        onDrop={aoSoltar}
        className={`mt-5 flex cursor-pointer flex-col items-center rounded-[10px] border border-dashed px-5 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-accent ${
          arrastando
            ? "border-accent bg-accent-bg"
            : "border-border-strong bg-s0 hover:bg-s1"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          name="model"
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={aoEscolher}
        />

        {file ? (
          <div className="flex w-full items-center gap-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-border bg-s2 text-ink-2">
              <IconFileTypeXml size={20} stroke={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">
                {file.name}
              </span>
              <span className="block text-[12px] text-ink-3">
                {formatFileSize(file.size)}
              </span>
            </span>
            <button
              type="button"
              onClick={limpar}
              aria-label="Remover arquivo"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-ink-3 hover:bg-s1 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <IconX size={16} stroke={1.75} />
            </button>
          </div>
        ) : (
          <>
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-accent-border bg-accent-bg text-accent">
              <IconUpload size={20} stroke={1.75} />
            </span>
            <p className="text-[13px] font-medium">
              Arraste um arquivo aqui ou{" "}
              <span className="text-accent underline underline-offset-2">
                clique para escolher
              </span>
            </p>
            <p className="mt-1 text-[12px] text-ink-3">
              Formatos aceitos: {ACCEPTED_EXTENSIONS.join(", ")}
            </p>
          </>
        )}
      </div>

      {mensagem && (
        <p role="alert" className="mt-3 text-center text-[13px] text-pink">
          {mensagem}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!file || uploading}
        className="mt-5 w-full justify-center"
      >
        {uploading ? "Lendo…" : "Analisar"}
        {!uploading && <IconArrowRight size={18} stroke={1.75} />}
      </Button>
    </form>
  );
}
