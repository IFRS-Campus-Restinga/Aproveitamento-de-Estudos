package br.com.aproveitamento.dto;

import java.util.List;

public record CreateUsuarioDTO (
    String username,
    String password,
    List<String> roles) {}


