package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

@Data
@Entity
public class PPC {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = true)
    private String nomePCC;

    @Column(nullable = true)
    private int ano;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    private Curso curso;

    @OneToMany(mappedBy = "pcc", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Disciplina> disciplinas = new ArrayList<>();
    
	public PPC() {
		super();
	}

	public PPC(String nomePCC, int ano, Curso curso) {
		super();
		this.nomePCC = nomePCC;
		this.ano = ano;
		this.curso = curso;
	}
    
    
}