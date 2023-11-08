import { Etapa } from "./Etapa";

export interface Edital {
  id: string;
  numero: string;
  dataInicio: string;
  dataFim: string;
  etapas?: Etapa[];
}
