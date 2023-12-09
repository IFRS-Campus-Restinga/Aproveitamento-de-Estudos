package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class UsuarioService {

	private UsuarioRepository usuarioRepository;

	public UsuarioService(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	public List<Usuario> list() {
		return usuarioRepository.findAll();
	}

	public Usuario findById(@NotNull @Positive Long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if (!usuario.isPresent())
			return null;
		return usuario.get();
	}

	public Usuario create(@Valid @NotNull Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public Usuario update(@Valid Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	public void delete(@NotNull @Positive Long id) {
		usuarioRepository.deleteById(id);
	}

	public Usuario findByEmail(@NotNull String email) {
		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		if (!usuario.isPresent())
			return null;
		return usuario.get();
	}
}
