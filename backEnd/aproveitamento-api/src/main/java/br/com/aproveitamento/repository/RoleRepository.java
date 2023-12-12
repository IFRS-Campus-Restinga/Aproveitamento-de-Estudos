package br.com.aproveitamento.repository;

import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(UsuarioTipo roleName);


}
