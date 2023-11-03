package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
public class Edital {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	 	
	@Column
	private String numero;
	
	@Column(nullable = false)
	private Date dataInicio;
		
	@Column(nullable = false)
	private Date dataFim;
	
	@OneToMany(mappedBy = "edital", cascade = CascadeType.ALL,  orphanRemoval = true)
	private List<Etapa> etapas = new ArrayList<>();
	
	@OneToMany(mappedBy = "edital", cascade = CascadeType.ALL,  orphanRemoval = true)
	private List<Requisicao> requisicoes = new ArrayList<>();
	
	public Edital() {
		super();
	}

	public Edital(String numero, Date dataInicio, Date dataFim) {
		super();
		this.numero = numero;
		this.dataInicio = dataInicio;
		this.dataFim = dataFim;
	}
	
}
