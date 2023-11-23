package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.enums.converters.RequisicaoTipoConverter;
import br.com.aproveitamento.enums.converters.RequisicaoStatusConverter;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
public class Requisicao {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull
    @Column(nullable = false)
    @Convert(converter = RequisicaoTipoConverter.class)
    private RequisicaoTipo tipo;
    
    @NotNull
    @Column(nullable = false)
    @Convert(converter = RequisicaoStatusConverter.class)
    private RequisicaoStatus status;
    
	@Column(nullable = false)
	private Date dataCriacao;
	
	@Column(nullable = true)
	private String experienciasAnteriores;
	
	@Column(nullable = true)
	private Date dataAgendamentoProva;
	
	@Column(nullable = true)
	private double notaDaProva;
	
	@Column(nullable = true)
	private int diciplinaCursaAnteriormente;
	
	@Column(nullable = true)
	private double notaObtida;
	
	@Column(nullable = true)
	private int cargaHoraria;
	
	@OneToMany(mappedBy = "requisicao", cascade = CascadeType.ALL,  orphanRemoval = true)
	private List<Analise> analises = new ArrayList<>();
	
	@OneToMany(mappedBy = "requisicao", cascade = CascadeType.ALL,  orphanRemoval = true)
	private List<Anexo> anexos = new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Aluno aluno;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Edital edital;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

	private Disciplina disciplina;
	
	public Requisicao() {
		super();
	}

	public Requisicao(@NotNull RequisicaoTipo tipo, @NotNull RequisicaoStatus status, Date dataCriacao,
			String experienciasAnteriores, Date dataAgendamentoProva, double notaDaProva,
			int diciplinaCursaAnteriormente, double notaObtida, int cargaHoraria, Aluno aluno, Edital edital, Disciplina disciplina) {
		super();
		this.tipo = tipo;
		this.status = status;
		this.dataCriacao = dataCriacao;
		this.experienciasAnteriores = experienciasAnteriores;
		this.dataAgendamentoProva = dataAgendamentoProva;
		this.notaDaProva = notaDaProva;
		this.diciplinaCursaAnteriormente = diciplinaCursaAnteriormente;
		this.notaObtida = notaObtida;
		this.cargaHoraria = cargaHoraria;
		this.aluno = aluno;
		this.edital = edital;
		this.disciplina = disciplina;
	}

}
