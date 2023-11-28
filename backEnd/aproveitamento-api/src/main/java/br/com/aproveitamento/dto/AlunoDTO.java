package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Curso;

public record AlunoDTO(
    Long id,
    String nome,
    String email,
    boolean admin,
    UsuarioTipo tipo,
    String matricula,
    String dataIngresso,
    Curso curso) {
}

