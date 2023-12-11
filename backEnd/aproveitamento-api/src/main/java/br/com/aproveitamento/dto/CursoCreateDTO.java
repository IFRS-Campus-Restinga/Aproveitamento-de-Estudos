package br.com.aproveitamento.dto;

import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CursoCreateDTO(
        Long id,
        @NotBlank(message = "O nome do curso não pode estar em branco")
        @Pattern(regexp = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]*$", message = "Contém caracter inválido ou nome incompleto! Use somente letras.")
        @Size(min = 2, max = 120, message = "O nome do curso deve ter entre 2 e 120 caracteres")
        String nome,
        Long coordenador_id,
        List<CoordenadorDTO> coordenadores
        ) {
}
