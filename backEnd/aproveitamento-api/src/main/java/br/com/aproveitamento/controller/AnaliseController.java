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

import br.com.aproveitamento.dto.AnaliseDTO;
import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.service.AnaliseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/analise")
public class AnaliseController {

	@Autowired
	private AnaliseService analiseService;
	
	@GetMapping
	public @ResponseBody List<Analise> list(){
		return analiseService.list();
	}
	
	@GetMapping("/{id}")
	public List<Analise> findById(@PathVariable @NotNull @Positive Long id) {
		return analiseService.listByIdRequisicao(id);
	}
	
	@PostMapping
	public ResponseEntity<Analise> create(@RequestBody @NotNull @Valid AnaliseDTO analise){
		return ResponseEntity.status(HttpStatus.CREATED).body(analiseService.create(analise));
	}
	
	@PutMapping
	public Analise update(@RequestBody @Valid Analise analise){
		return analiseService.update(analise);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		analiseService.delete(id);
    }
}
