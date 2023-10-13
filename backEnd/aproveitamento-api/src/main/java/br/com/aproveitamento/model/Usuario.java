package br.com.aproveitamento.model;


import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.enums.converters.UsuarioTipoConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String nome;
    
    @NotNull
    @Column(nullable = false)
    private String email;
    
    @Column
    private boolean admin; 
    
    @NotNull
    @Column(nullable = false)
    @Convert(converter = UsuarioTipoConverter.class)
    private UsuarioTipo tipo;
}
