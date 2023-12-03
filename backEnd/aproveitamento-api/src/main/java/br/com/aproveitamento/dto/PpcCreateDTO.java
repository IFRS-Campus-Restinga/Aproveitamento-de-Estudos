package br.com.aproveitamento.dto;

import br.com.aproveitamento.model.Curso;

public record PpcCreateDTO(
    String id,
    Curso curso,
   // long curso_id,
    String nomePCC,
    int ano) { 

}
