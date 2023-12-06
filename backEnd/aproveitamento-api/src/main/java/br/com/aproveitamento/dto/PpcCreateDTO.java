package br.com.aproveitamento.dto;

import br.com.aproveitamento.model.Curso;

public record PpcCreateDTO(
    String id,
    Curso curso,
    String nomePCC,
    int ano) { 

}
