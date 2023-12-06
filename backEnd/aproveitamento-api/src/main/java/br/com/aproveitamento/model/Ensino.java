package br.com.aproveitamento.model;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Ensino extends Servidor {
	
	public Ensino() {
		
	}
	
	public Ensino(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo,String siape) {
		super(nome, email, admin, tipo, siape);
	}


	
}
