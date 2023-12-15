package br.com.aproveitamento.service;

import java.util.*;

import br.com.aproveitamento.dto.CreateUsuarioDTO;
import br.com.aproveitamento.dto.MessageDTO;
import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Role;
import br.com.aproveitamento.repository.GoogleUserRepository;
import br.com.aproveitamento.repository.RoleRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
@Validated
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {

	private final UsuarioRepository usuarioRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	public MessageDTO createUser(CreateUsuarioDTO dto){
		Usuario usuario = Usuario.builder()
				.username(dto.username())
				.password(passwordEncoder.encode(dto.password()))
				.build();
		Set<Role> roles = new HashSet<>();

		usuario.setEmail(dto.email());
		usuario.setAdmin(dto.admin());
		usuario.setNome(dto.nome());
		usuario.setTipo(UsuarioTipo.COORDENADOR);

		dto.roles().forEach(r -> {
			Role role  = roleRepository.findByRole(UsuarioTipo.valueOf(r))
					.orElseThrow(() -> new RuntimeException("Role not found | Função nao encontrada"));
			roles.add(role);
		});

		usuario.setRoles(roles);
		usuarioRepository.save(usuario);

		return new MessageDTO("usuario " + usuario.getUsername() + " salvo");
	};

//	public UsuarioService(UsuarioRepository usuarioRepository, RoleRepository roleRepository){
//		super();
//		this.usuarioRepository = usuarioRepository;
//		this.roleRepository = roleRepository;
//	}


	
	public List<Usuario> list(){
		return usuarioRepository.findAll();
	}


	
	public Usuario findById(@NotNull @Positive Long id){
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(!usuario.isPresent()) return null;
		return usuario.get();
	}
	
	public Usuario create(@Valid @NotNull Usuario usuario){
		return usuarioRepository.save(usuario);
	}
	
	public Usuario update(@Valid Usuario usuario){
		return usuarioRepository.save(usuario);
	}
	
	public void delete(@NotNull @Positive Long id){
		usuarioRepository.deleteById(id);
	}



}
