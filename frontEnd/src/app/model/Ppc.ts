import { Curso } from "./Curso";
import { Disciplina } from "./Disciplina";

export interface Ppc {
  id: string;
  nomePPC: string;
  ano: number;

  cursos?: Curso;
  disciplinas?: Disciplina[];
}
