package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Curso;

public record CoordenadorDTO(
    Long id,
    String nome,
    String email,
    boolean admin,
    boolean ativo,
    UsuarioTipo tipo,
    String siape,
    Curso curso) {
}

