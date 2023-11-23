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

import br.com.aproveitamento.model.Professor;
import br.com.aproveitamento.service.ProfessorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/Professor")
public class ProfessorController {
	
	@Autowired
	private ProfessorService professorService;
	
	@GetMapping
	public @ResponseBody List<Professor> list(){
		return professorService.list();
	}
	
	@GetMapping("/{id}")
	public Professor findById(@PathVariable @NotNull @Positive Long id) {
		return professorService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Professor> create(@RequestBody @NotNull @Valid Professor professor){
		return ResponseEntity.status(HttpStatus.CREATED).body(professorService.create(professor));
	}
	
	@PutMapping
	public Professor update(@RequestBody @Valid Professor professor){
		return professorService.update(professor);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		professorService.delete(id);
    }
	
}
