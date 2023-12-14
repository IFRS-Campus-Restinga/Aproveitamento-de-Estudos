package br.com.aproveitamento.dto;

public record AnaliseReadDTO( 
    Long id,
    String status,
    String parecer,
    String servidorNome
) {
}
