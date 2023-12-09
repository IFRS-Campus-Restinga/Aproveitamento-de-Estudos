package br.com.aproveitamento.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DisciplinaDTO(
        Long id,
        @NotBlank(message = "O nome da disciplina é obrigatório")
                @Pattern(regexp = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$", 
                message = "O nome da disciplina não atende aos critérios de validação")
                @Size(min = 10, max = 120, message = "O nome da disciplina deve ter entre 10 e 120 caracteres")
        String nome,
         @NotBlank(message = "O código da disciplina é obrigatório")
                @Pattern(regexp = "^[A-Z]{3}-[A-Z]{3}[0-9]{3}$", message = "O código da disciplina deve seguir o padrão especificado")
                @Size(min = 10, max = 10, message = "O código da disciplina deve ter exatamente 10 caracteres")
        String codDisciplina,
        @NotNull(message = "A carga horária é obrigatória")
                @Min(value = 10, message = "A carga horária deve ser no mínimo 10")
                @Max(value = 88, message = "A carga horária deve ser no máximo 88")
        int cargaHoraria, 
        @NotNull(message = "O ID do PPC é obrigatório")
        long ppc_id,
        @NotNull(message = "O ID do curso é obrigatório")
        long curso_id) {

}
