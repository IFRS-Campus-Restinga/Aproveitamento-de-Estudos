package br.com.aproveitamento.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DisciplinaDTO(
        Long id,
         @NotBlank(message = "O nome não pode estar em branco")
        @Pattern(regexp = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$", 
                 message = "Contém caracter inválido! Use somente letras.")
        @Size(min = 10, max = 120, message = "O nome deve ter entre 10 e 120 caracteres")
        String nome,
        @NotBlank(message = "O código da disciplina não pode estar em branco")
        @Pattern(regexp = "^[A-Z]{3}-[A-Z]{3}[0-9]{3}$", message = "Formato inválido para o código da disciplina")
        @Size(min = 10, max = 10, message = "O código deve ter entre 10 caracteres")
        String codDisciplina,
        @NotNull(message = "A carga horária não pode estar em branco")
        @Min(value = 10, message = "A carga horária deve ser no mínimo 10 horas")
        @Max(value = 88, message = "A carga horária deve ser no máximo 88 horas")
        int cargaHoraria, 
        @NotNull(message = "O ID do PPC não pode estar em branco")
        long ppc_id,
        @NotNull(message = "O ID do curso não pode estar em branco")
        long curso_id) {

}
