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

import br.com.aproveitamento.dto.CoordenadorDTO;
import br.com.aproveitamento.model.Coordenador;
import br.com.aproveitamento.model.Professor;
import br.com.aproveitamento.service.CoordenadorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/coordenador")
public class CoordenadorController {

	@Autowired
	private CoordenadorService coordenadorService;

	@GetMapping
	public @ResponseBody List<CoordenadorDTO> list() {
		return coordenadorService.list();
	}

	@GetMapping("/{id}")
	public Coordenador findById(@PathVariable @NotNull @Positive Long id) {
		return coordenadorService.findById(id);
	}

	@PostMapping
	public ResponseEntity<Coordenador> create(@RequestBody @NotNull @Valid Coordenador coordenador) {
		return ResponseEntity.status(HttpStatus.CREATED).body(coordenadorService.create(coordenador));
	}

	@PutMapping
	public Coordenador update(@RequestBody @Valid Coordenador coordenador) {
		return coordenadorService.update(coordenador);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id) {
		coordenadorService.delete(id);
	}

	@GetMapping("/curso/{id}")
	public @ResponseBody List<CoordenadorDTO> listCoordenadorByCurso(@PathVariable @NotNull @Positive Long id) {
		return coordenadorService.listByIdCurso(id);
	}
}
