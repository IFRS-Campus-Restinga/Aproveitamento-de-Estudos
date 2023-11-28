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

import br.com.aproveitamento.dto.ServidorDTO;
import br.com.aproveitamento.model.Servidor;
import br.com.aproveitamento.service.ServidorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/servidor")
public class ServidorController {
	
	@Autowired
	private ServidorService servidorService;
	
	@GetMapping
	public @ResponseBody List<ServidorDTO> list(){
		return servidorService.list();
	}
	
	@GetMapping("/{id}")
	public ServidorDTO findById(@PathVariable @NotNull @Positive Long id) {
		return servidorService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Servidor> create(@RequestBody @NotNull @Valid Servidor servidor){
		return ResponseEntity.status(HttpStatus.CREATED).body(servidorService.create(servidor));
	}
	
	@PostMapping("/servidor")
	public ResponseEntity<Servidor> createServidor(@RequestBody @NotNull @Valid ServidorDTO servidor){
		return ResponseEntity.status(HttpStatus.CREATED).body(servidorService.createOrUpdateServidor(servidor));
	}

	@PutMapping
	public Servidor update(@RequestBody @Valid ServidorDTO servidor){
		return servidorService.createOrUpdateServidor(servidor);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		servidorService.delete(id);
    }
}
