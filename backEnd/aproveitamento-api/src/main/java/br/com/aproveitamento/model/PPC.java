package br.com.aproveitamento.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import lombok.Data;

@Data
@Entity
public class PPC {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = true)
    private String nomePPC;

    @Column(nullable = true)
    private int ano;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Curso curso;

    @JsonIgnore
    @OneToMany(mappedBy = "ppc", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disciplina> disciplinas = new ArrayList<>();

    public PPC() {
        super();
    }

    public PPC(String nomePPC, int ano, Curso curso) {
        super();
        this.nomePPC = nomePPC;
        this.ano = ano;
        this.curso = curso;
    }

    public Optional<Disciplina> stream() {
        return null;
    }

}