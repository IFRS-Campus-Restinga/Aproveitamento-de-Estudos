package br.com.aproveitamento.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String nome; 
    
    @Column(nullable = false)
    private String arquivo;
    
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Requisicao requisicao;

	public Anexo(Long id, String nome, String arquivo, Requisicao requisicao) {
		super();
		this.id = id;
		this.nome = nome;
		this.arquivo = arquivo;
		this.requisicao = requisicao;
	}
}
