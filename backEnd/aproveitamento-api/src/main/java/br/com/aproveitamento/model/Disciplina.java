/*Está em construção
Guilherme Selau Pereira*/
package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.List;

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

@Data
@Entity
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = true)
    private String nome;

    @Column(nullable = true)
    private int codDisciplina;

    @Column(nullable = true)
    private int cargaHoraria;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private PPC pcc;
    
	  @OneToMany(mappedBy = "disciplina", cascade = CascadeType.ALL,  orphanRemoval = true)
	  private List<Requisicao> requisicoes = new ArrayList<>();
    
    public Disciplina() {
		  super();
	  }
    
	  public Disciplina(String nome, int cargaHoraria, PPC pcc, int codDisciplina) {
		  super();
		  this.nome = nome;
		  this.cargaHoraria = cargaHoraria;
		  this.pcc = pcc;
      this.codDisciplina = codDisciplina;
	  }
  
}
