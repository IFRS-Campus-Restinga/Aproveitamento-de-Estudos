package br.com.aproveitamento.dto;

public record DisciplinaDTO(
        Long id,
        String nome,
        String codDisciplina,
        int cargaHoraria, 
        long ppc_id,
        long curso_id) {

}
