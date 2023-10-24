package br.com.aproveitamento.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Coordenador extends Servidor {

    @Column(nullable = true)
    private Date dataInicio;
	
    @Column(nullable = true)
    private Date dataFim;
	
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Curso curso;
    
    public Coordenador() {
    	super();
    }
    
    public Coordenador( @NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo, String siape,
    					Date dataInicio, Date dataFim, Curso curso) {
		super(nome, email, admin, tipo, siape);
		this.dataInicio = dataInicio;
		this.dataFim = dataFim;
		this.curso = curso;
	}

}
