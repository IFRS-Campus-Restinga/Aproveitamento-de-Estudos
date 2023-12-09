package br.com.aproveitamento.dto;

public record PpcReadDTO(
    Long id,
    Long curso_id,
    String nomePPC,
    int ano,
    String nomeCurso) {

}
