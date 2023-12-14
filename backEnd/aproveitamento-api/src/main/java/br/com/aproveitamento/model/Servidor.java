package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.List;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Servidor extends Usuario {

	@Column(nullable = true)
	private String siape;

	@OneToMany(mappedBy = "servidor", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Analise> Analises = new ArrayList<>();

	public Servidor() {
		super();
	}

	public Servidor(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo,
			String siape) {
		super(nome, email, admin, tipo);

		try {
			this.siape = siape;

		} catch (Exception e) {
			// TODO: handle exception
		}
	}

}
