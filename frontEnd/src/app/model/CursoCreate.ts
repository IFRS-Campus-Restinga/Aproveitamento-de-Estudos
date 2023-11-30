import { Coordenador } from "./Coordenador";

export interface CursoCreate {
    id: string;
    nome: string;
    coordenador_id: number;
    coordenadores: Coordenador[];
}
