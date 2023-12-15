package br.com.aproveitamento.dto;

import java.util.List;

public record CreateUsuarioDTO (


    String nome,
    String email,
    boolean admin,
    String tipo,

    String username,
    String password,
    List<String> roles) {}


