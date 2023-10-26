package br.com.aproveitamento.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.enums.converters.UsuarioTipoConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Etapa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private Date dataInicio;
	
	@Column(nullable = false)
	private Date dataFim;
		
	@NotNull
	@Column(nullable = false)
	@Convert(converter = UsuarioTipoConverter.class)
	private UsuarioTipo ator;
	 	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Edital edital;

	public Etapa() {
		super();
	}

	public Etapa(@NotNull String nome, Date dataInicio, Date dataFim, @NotNull UsuarioTipo ator, Edital edital) {
		super();
		this.nome = nome;
		this.dataInicio = dataInicio;
		this.dataFim = dataFim;
		this.ator = ator;
		this.edital = edital;
	}
	
}
