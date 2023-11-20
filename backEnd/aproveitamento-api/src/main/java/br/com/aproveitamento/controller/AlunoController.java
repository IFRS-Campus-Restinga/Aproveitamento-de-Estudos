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

import br.com.aproveitamento.dto.AlunoDTO;
import br.com.aproveitamento.model.Aluno;
import br.com.aproveitamento.service.AlunoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

	@Autowired
	private AlunoService alunoService;
	
	@GetMapping
	public @ResponseBody List<AlunoDTO> list(){
		return alunoService.list();
	}
	
	@GetMapping("/{id}")
	public AlunoDTO findById(@PathVariable @NotNull @Positive Long id) {
		return alunoService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Aluno> create(@RequestBody @NotNull @Valid Aluno aluno){
		return ResponseEntity.status(HttpStatus.CREATED).body(alunoService.create(aluno));
	}
	
	@PutMapping
	public Aluno update(@RequestBody @Valid Aluno aluno){
		return alunoService.update(aluno);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		alunoService.delete(id);
    }
}
