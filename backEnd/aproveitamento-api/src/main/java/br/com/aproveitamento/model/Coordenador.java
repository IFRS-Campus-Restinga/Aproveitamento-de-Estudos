package br.com.aproveitamento.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Coordenador extends Servidor {

	@NotNull
    @Column(nullable = false)
    private Date dataInicio;
	
	@NotNull
    @Column(nullable = false)
    private Date dataFim;
	
}
