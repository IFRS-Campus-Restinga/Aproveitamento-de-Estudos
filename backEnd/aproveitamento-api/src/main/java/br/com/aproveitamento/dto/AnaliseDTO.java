package br.com.aproveitamento.dto;

public record AnaliseDTO(
    Long id,
    String status,
    String parecer,
    Long servidor_id,
    Long requisicao_id
){

    
}
