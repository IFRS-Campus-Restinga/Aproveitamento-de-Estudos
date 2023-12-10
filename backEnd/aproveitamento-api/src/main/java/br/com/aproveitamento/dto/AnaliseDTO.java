package br.com.aproveitamento.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AnaliseDTO(
    Long id,
    @NotBlank(message = "É necessario fornecer o status")
    String status,
    @NotBlank(message = "O Parecer é obrigatorio")
    @Size(min = 10, max = 200, message = "O Parecer deve ter entre 10 e 200 caracteres")
    String parecer,
    @NotNull(message = "O servidor_id não pode ser nulo")
    Long servidor_id,
    @NotNull(message = "A requisicao_id não pode ser nulo")
    Long requisicao_id
){

    
}
