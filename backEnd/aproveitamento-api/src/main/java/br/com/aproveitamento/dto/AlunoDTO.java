package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Curso;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AlunoDTO(
    Long id,
    @NotBlank(message = "O nome não pode estar em branco.")
    @Size(min = 3, max = 120, message = "O nome deve ter entre 3 e 120 caracteres.")
    String nome,
    @NotBlank(message = "O e-mail não pode estar em branco.")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@restinga\\.ifrs\\.edu\\.br$", message = "O e-mail deve ser válido")
    @Email(message = "O e-mail deve ser válido.")
    @Size(max = 50, message = "O e-mail deve ter no máximo 50 caracteres.")
    String email,
    boolean admin,
    UsuarioTipo tipo,
    @NotBlank(message = "A matrícula não pode estar em branco.")
    @Pattern(regexp = "[0-9]{10}", message = "A matrícula deve conter exatamente 10 dígitos numéricos.")
    String matricula,
    @NotBlank(message = "A data de ingresso não pode estar em branco.")
    String dataIngresso,
    Curso curso) {
}

