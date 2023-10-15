package br.com.aproveitamento.controller;

import java.util.ArrayList;
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

import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.model.Etapa;
import br.com.aproveitamento.service.EditalService;
import br.com.aproveitamento.service.EtapaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/edital")
public class EditalController {
	
	@Autowired
	private EditalService editalService;
	@Autowired
	private EtapaService etapaService;
	
	@GetMapping
	public @ResponseBody List<Edital> list(){
		return editalService.list();
	}
	
	@GetMapping("/{id}")
	public Edital findById(@PathVariable @NotNull @Positive Long id) {
		return editalService.findById(id);
	}
	
	@PostMapping
	public ResponseEntity<Edital> create(@RequestBody @NotNull Edital edital){
		List<Etapa> EtapasOriginais = edital.getEtapas();
        edital.setEtapas(new ArrayList<>());

        Edital e = editalService.create(edital);

        for(Etapa etapa : EtapasOriginais) {
            etapa.setEdital(e);
            etapaService.create(etapa);
            e.getEtapas().add(etapa);
            editalService.update(e);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(e);
	}
		
	@PutMapping
	public ResponseEntity<Edital> update(@RequestBody @Valid Edital edital){
		List<Etapa> EtapasOriginais = edital.getEtapas();
        edital.setEtapas(new ArrayList<>());

        Edital e = editalService.create(edital);

        for(Etapa etapa : EtapasOriginais) {
            etapa.setEdital(e);
            etapaService.create(etapa);
            e.getEtapas().add(etapa);
            editalService.update(e);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(e);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		editalService.delete(id);
    }

}
