package br.com.aproveitamento.model;


import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.enums.converters.UsuarioTipoConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements UserDetails {

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

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_role", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    private boolean expired = false;
    private boolean locked = false;
    private boolean credentialsExpired = false;
    private boolean disable = false;

    // -------------------------------------------------------------
    public Usuario(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo) {
        super();
        this.nome = nome;
        this.email = email;
        this.admin = admin;
        this.tipo = tipo;
    }

    public Usuario(@NotNull String nome, @NotNull String email, boolean admin, @NotNull UsuarioTipo tipo, @NotNull String username, @NotNull String password, @NotNull Optional<Role> newRoles) {
        super();
        this.nome = nome;
        this.email = email;
        this.admin = admin;
        this.tipo = tipo;
        this.username = username;
        this.password = password;
        this.roles = newRoles.map(Collections::singleton).orElse(Collections.emptySet());
    }


    //--------------------------------------------------------------

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return roles;
    }


    @Override
    public boolean isAccountNonExpired(){
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked(){
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return !credentialsExpired;
    }

    @Override
    public boolean isEnabled(){
        return !disable;
    }


}
