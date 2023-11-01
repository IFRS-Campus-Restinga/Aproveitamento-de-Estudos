package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
@Entity
public class Aluno extends Usuario{

    @Column(nullable = true)
    private String matricula;
    
    @Column(nullable = true)
    private Date dataIngresso;
	
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL,  orphanRemoval = true)
	private List<Requisicao> requisicoes = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Curso curso;
    
    public Aluno() {
    	super();
    }

	public Aluno(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo,
				 String matricula, Date dataIngresso, Curso curso) {
		super(nome, email, admin, tipo);
		this.matricula = matricula;
		this.dataIngresso = dataIngresso;
		this.curso = curso;
	}
}
