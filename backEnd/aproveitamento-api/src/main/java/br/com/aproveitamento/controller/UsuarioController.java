package br.com.aproveitamento.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.service.UsuarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public @ResponseBody List<Usuario> list() {
		return usuarioService.list();
	}

	@GetMapping("/{id}")
	public Usuario findById(@PathVariable @NotNull @Positive Long id) {
		return usuarioService.findById(id);
	}

	@PostMapping
	public ResponseEntity<Usuario> create(@RequestBody @NotNull @Valid Usuario Usuario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(Usuario));
	}

	@PutMapping
	public Usuario update(@RequestBody @Valid Usuario Usuario) {
		return usuarioService.update(Usuario);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id) {
		usuarioService.delete(id);
	}

	@GetMapping("/email/{email}")
	public Usuario findByEmail(@PathVariable @NotNull String email) {
		return usuarioService.findByEmail(email);
	}
}
