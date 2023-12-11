import { Analise } from "./Analise";
import { Anexo } from "./Anexo";

export interface Requisicao {
  id: string,
  tipo: string,
  status: string,
  dataCriacao: string,
  experienciasAnteriores: string,
  dataAgendamentoProva: string,
  notaDaProva: number,
  diciplinaCursaAnteriormente: string,
  notaObtida: number,
  cargaHoraria: number,
  analises: Analise[],
  anexos: Anexo[],
  aluno_id: number,
  edital_id: number,
  disciplina_id: number
}
