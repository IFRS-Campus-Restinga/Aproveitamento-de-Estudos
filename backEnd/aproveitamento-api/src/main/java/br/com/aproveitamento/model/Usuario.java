package br.com.aproveitamento.model;


import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Nonnull
    @Column(nullable = false)
    private String nome;
    
    @Nonnull
    @Column(nullable = false)
    private String email;
    
    @Column
    private boolean isAdmin; 
}
