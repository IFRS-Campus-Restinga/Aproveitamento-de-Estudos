package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Edital {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	 
	
	@Column
	private String numero;
	
	 //@Column(nullable = false)
	 //private Date dataInicio;
		
	// @Column(nullable = false)
	// private Date dataFim;
	
	// @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "edital")
	// private List<Etapa> etapas = new ArrayList<>();

}
