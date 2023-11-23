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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@Entity
@Getter
@AllArgsConstructor
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

    //private UserRole userRole;
    
    @NotNull
    @Column(nullable = false)
    @Convert(converter = UsuarioTipoConverter.class)
    private UsuarioTipo tipo;

   // @Override
    //public Collection<? extends GrantedAuthority> getAuthorites(){
    //    if(this.);
//
     //   return null;
   // }
    
    public Usuario() {
		super();
	}

	public Usuario(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo) {
		super();
		this.nome = nome;
		this.email = email;
		this.admin = admin;
		this.tipo = tipo;
	}

}
