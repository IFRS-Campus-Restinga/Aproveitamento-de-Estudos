package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.UsuarioTipo;

public record ServidorDTO(
    Long id,
    String nome,
    String email, 
    boolean admin, 
    UsuarioTipo tipo,
    String siape) {
}
