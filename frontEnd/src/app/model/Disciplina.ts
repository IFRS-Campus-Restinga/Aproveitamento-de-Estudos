import { Ppc } from "./Ppc";

export interface Disciplina {
    id: string;
    nome: string;
    codDisciplina: string;
    cargaHoraria: number;
    ppc?: Ppc;
    curso_id?: number;
    ppc_id?: number;
  }
