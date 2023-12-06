package br.com.aproveitamento.model;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Data
@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private UsuarioTipo role;

    @Override
    public String getAuthority(){
        return role.getValue();
    }

}
