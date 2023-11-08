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

import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.service.RequisicaoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/requisicao")
public class RequisicaoController {

	@Autowired
	private RequisicaoService requisicaoService;
	
	@GetMapping
	public @ResponseBody List<Requisicao> list(){
		return requisicaoService.list();
	}
	
	@GetMapping("/{id}")
	public Requisicao findById(@PathVariable @NotNull @Positive Long id) {
		return requisicaoService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Requisicao> create(@RequestBody @NotNull @Valid Requisicao requisicao){
		return ResponseEntity.status(HttpStatus.CREATED).body(requisicaoService.create(requisicao));
	}
	
	@PutMapping
	public Requisicao update(@RequestBody @Valid Requisicao requisicao){
		return requisicaoService.update(requisicao);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		requisicaoService.delete(id);
    }
}
