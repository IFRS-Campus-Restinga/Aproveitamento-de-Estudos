package br.com.aproveitamento.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Servidor extends Usuario {

	@Column(nullable = true)
	private String siape;
}
