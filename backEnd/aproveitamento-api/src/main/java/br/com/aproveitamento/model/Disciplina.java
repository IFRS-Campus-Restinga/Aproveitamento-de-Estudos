package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@Entity
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = true)
    private String nome;

    @Column(nullable = true)
    /*@NotBlank
    @Pattern(regexp = "^[A-Z]{3}-[A-Z]{3}[0-9]{3}$", message = "O código deve seguir o padrão ABC-DEF123.")*/
    private String codDisciplina;

    @Column(nullable = true)
    /*@NotBlank
    @Size(min = 10, max = 120, message = "O nome do componente curricular deve ter entre 10 e 120 caracteres.")*/
    private int cargaHoraria;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private PPC ppc;
    
    @OneToMany(mappedBy = "disciplina", cascade = CascadeType.ALL,  orphanRemoval = true)
    private List<Requisicao> requisicoes = new ArrayList<>();

    public Disciplina() {
        super();
    }

    public Disciplina(String nome, int cargaHoraria, PPC ppc, String codDisciplina) {
        super();
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.ppc = ppc;
        this.codDisciplina = codDisciplina;
    }

}
