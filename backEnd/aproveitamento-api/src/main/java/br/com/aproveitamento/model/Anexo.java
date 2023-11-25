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

	@Column(nullable = false)
    private String pasta;
    
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Requisicao requisicao;

	public Anexo(){
		
	}

	public Anexo(String nome, String arquivo, String pasta, Requisicao requisicao) {
		super();
		this.nome = nome;
		this.arquivo = arquivo;
		this.pasta = pasta;
		this.requisicao = requisicao;
	}
}
