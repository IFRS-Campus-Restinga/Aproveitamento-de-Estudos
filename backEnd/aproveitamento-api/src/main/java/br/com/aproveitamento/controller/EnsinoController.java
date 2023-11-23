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

import br.com.aproveitamento.model.Ensino;
import br.com.aproveitamento.service.EnsinoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/ensino")
public class EnsinoController {
	
	@Autowired
	private EnsinoService ensinoService;
	
	@GetMapping
	public @ResponseBody List<Ensino> list(){
		return ensinoService.list();
	}
	
	@GetMapping("/{id}")
	public Ensino findById(@PathVariable @NotNull @Positive Long id) {
		return ensinoService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Ensino> create(@RequestBody @NotNull @Valid Ensino ensino){
		return ResponseEntity.status(HttpStatus.CREATED).body(ensinoService.create(ensino));
	}
	
	@PutMapping
	public Ensino update(@RequestBody @Valid Ensino ensino){
		return ensinoService.update(ensino);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		ensinoService.delete(id);
    }
}
