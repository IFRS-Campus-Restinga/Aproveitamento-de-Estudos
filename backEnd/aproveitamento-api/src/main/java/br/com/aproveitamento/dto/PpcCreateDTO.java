package br.com.aproveitamento.dto;

import br.com.aproveitamento.model.Curso;

public record PpcCreateDTO(
    String id,
    Long curso_id,
    String nomePPC,
    int ano) { 

}
