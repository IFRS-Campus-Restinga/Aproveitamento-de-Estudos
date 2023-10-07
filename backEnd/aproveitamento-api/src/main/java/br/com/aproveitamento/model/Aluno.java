package br.com.aproveitamento.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Aluno extends Usuario{

	@NotNull
    @Column(nullable = false)
    private String matricula;
    
	@NotNull
    @Column(nullable = false)
    private Date dataIngresso;
	
	@NotNull
    @Column(nullable = false)
	private String curso;
}
