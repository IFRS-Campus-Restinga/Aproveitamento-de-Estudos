package br.com.aproveitamento.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Aluno extends Usuario{

    @Column(nullable = true)
    private String matricula;
    
    @Column(nullable = true)
    private Date dataIngresso;
	
    @Column(nullable = true)
	private String curso;
}
