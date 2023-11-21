package br.com.aproveitamento.dto;

public record DisciplinaDTO(
        Long id,
        String nome,
        String codDisciplina,
        int cargaHoraria, 
        String ppc,
        String curso) {

}
