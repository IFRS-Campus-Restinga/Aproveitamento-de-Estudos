package br.com.aproveitamento.dto;
import br.com.aproveitamento.validation.AnoMenorOuIgualAtual;
import br.com.aproveitamento.validation.FourDigitNumber;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PpcCreateDTO(
    String id,

    @NotNull(message = "O ID do curso é obrigatório")
    Long curso_id,

    @NotBlank(message = "O nome do PPC é obrigatório")
    @Size(min = 3, max = 100, message = "O nome do PPC deve ter entre 3 e 100 caracteres")
    @Pattern(regexp = "^[^\\s].*[^\\s]$", message = "O nome do PPC não pode começar ou terminar com espaços")
    @Pattern(regexp = "^(?!.*\\s{2}).*$", message = "O nome do PPC não pode ter espaços duplos")
    @Pattern(regexp = "^[A-Za-z0-9\\s-]*$", message = "O nome do PPC não pode conter caracteres especiais")
    String nomePPC,

    @NotNull(message = "O ano é obrigatório")
    @Min(value = 2010, message = "O ano deve ser maior ou igual a 2010")
    @AnoMenorOuIgualAtual(message = "O ano não pode ser maior que o atual")
    @FourDigitNumber(message = "O ano deve conter exatamente 4 dígitos")
    int ano) { 

}