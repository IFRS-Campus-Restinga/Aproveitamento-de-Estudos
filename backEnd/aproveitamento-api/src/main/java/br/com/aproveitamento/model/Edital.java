package br.com.aproveitamento.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Calendar;


import org.springframework.lang.NonNull;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
public class Edital {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @NonNull
    @Pattern(regexp = "^(?!.*(?:\\s{2}|/.*\\/))[a-zA-Z0-9À-ÖØ-ÿ\\s/]{6,35}$",
            message = "Valor para numero não atende aos critérios de validação")
    @Size(min = 6, max = 35, message = "Disciplina cursada anteriormente deve ter entre 6 e 35 caracteres")
    private String numero;

    @Column(name = "data_inicio")
    @NonNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataInicio;

    @Column(nullable = false)
    @NonNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataFim;

    @OneToMany(mappedBy = "edital", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Etapa> etapas = new ArrayList<>();

    @OneToMany(mappedBy = "edital", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Requisicao> requisicoes = new ArrayList<>();

    public Edital() {
        super();
    }

    public Edital(String numero, Date dataInicio, Date dataFim) {
        super();
        this.numero = numero;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public Edital(String string, LocalDate hoje, LocalDate amanha) {
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
    yesterdayCalendar.add(Calendar.DAY_OF_MONTH, -1);

    Calendar dataInicioCalendar = Calendar.getInstance();
    dataInicioCalendar.setTime(dataInicio);

    return dataInicio.before(dataFim) && !dataInicio.before(yesterdayCalendar.getTime());
}
     

}

