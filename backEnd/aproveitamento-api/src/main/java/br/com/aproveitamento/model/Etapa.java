package br.com.aproveitamento.model;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.enums.converters.UsuarioTipoConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Etapa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull
	@Column(nullable = false)
	@Pattern(regexp = "^[^<>;'\"`\\\\]{6,240}$", 
                message = "Valor para numero não atende aos critérios de validação")
    @Size(min = 6, max = 240, message = "Disciplina cursada anteriormente deve ter entre 6 e 35 caracteres")
	
	private String nome;
	
	@Column(nullable = false)
	private Date dataInicio;
	
	@Column(nullable = false)
	private Date dataFim;
		
	@NotNull
	@Column(nullable = false)
	@Convert(converter = UsuarioTipoConverter.class)
	private UsuarioTipo ator;
	 	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Edital edital;

	public Etapa() {
		super();
	}

	public Etapa(@NotNull String nome, Date dataInicio, Date dataFim, @NotNull UsuarioTipo ator, Edital edital) {
		super();
		this.nome = nome;
		this.dataInicio = dataInicio;
		this.dataFim = dataFim;
		this.ator = ator;
		this.edital = edital;
	}
	
	 public Etapa(String string, LocalDate hoje, LocalDate amanha, UsuarioTipo coordenador, Edital edital2) {
	}

	 @AssertTrue(message = "A data de início deve ser anterior à data de fim e a partir de ontem")
private boolean isDataInicioBeforeDataFim() {
    if (dataInicio == null || dataFim == null) {
        return true; // Se uma das datas for nula, não aplicamos a validação
    }

    Calendar currentCalendar = Calendar.getInstance();
    currentCalendar.setTime(new Date());

    Calendar yesterdayCalendar = Calendar.getInstance();
    yesterdayCalendar.setTime(new Date());
    yesterdayCalendar.add(Calendar.DAY_OF_MONTH, -2);

    Calendar dataInicioCalendar = Calendar.getInstance();
    dataInicioCalendar.setTime(dataInicio);

    return dataInicio.before(dataFim) && !dataInicio.before(yesterdayCalendar.getTime());
}
	
}
