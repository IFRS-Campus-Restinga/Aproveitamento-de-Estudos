package br.com.aproveitamento.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
public class Analise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
    @NotNull
    @Column(nullable = false)
    private String status;
    
    @NotNull
    @Column(nullable = false)
    private String parecer;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Servidor servidor;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Requisicao requisicao;
    
    public Analise() {
		super();
    }
    
	public Analise(Long id, @NotNull String status, @NotNull String parecer, Servidor servidor, Requisicao requisicao) {
		super();
		this.id = id;
		this.status = status;
		this.parecer = parecer;
		this.servidor = servidor;
		this.requisicao = requisicao;
	}
}
