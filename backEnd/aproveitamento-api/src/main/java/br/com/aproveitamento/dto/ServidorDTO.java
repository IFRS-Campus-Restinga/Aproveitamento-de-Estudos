package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ServidorDTO(
    Long id,
    
    @NotBlank(message = "O nome não pode estar em branco")
    @Pattern(regexp = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$", message = "Contém caracter inválido! Use somente letras.")
        @Size(min = 6, max = 120, message = "O nome deve ter entre 6 e 120 caracteres")
    String nome,

    @NotBlank(message = "O e-mail não pode estar em branco")
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@restinga\\.ifrs\\.edu\\.br$", message = "O e-mail deve ser válido")
        @Size(max = 50, message = "O e-mail deve ter no máximo 50 caracteres")
    String email, 
    boolean admin, 
    UsuarioTipo tipo,

    @NotBlank(message = "O SIAPE não pode estar em branco")
        @Pattern(regexp = "[0-9]{10}", message = "O SIAPE deve ter 10 dígitos numéricos")
        @Size(max = 10, message = "O SIAPE deve ter no máximo 10 dígitos numéricos")
    String siape) {
}
