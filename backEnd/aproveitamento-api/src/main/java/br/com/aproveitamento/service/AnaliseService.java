package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.repository.AnaliseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class AnaliseService {

	private AnaliseRepository analiseRepository;
	
	public AnaliseService(AnaliseRepository analiseRepository){
		super();
		this.analiseRepository = analiseRepository;
	}
	
	public List<Analise> list(){
		return analiseRepository.findAll();
	}
	
	public Analise findById(@NotNull @Positive Long id){
		Optional<Analise> analise = analiseRepository.findById(id);
		if(!analise.isPresent()) return null;
		return analise.get();
	}
	
	public Analise create(@Valid @NotNull Analise analise){
		return analiseRepository.save(analise);
	}
	
	public Analise update(@Valid Analise analise){
		return analiseRepository.save(analise);
	}
	
	public void delete(@NotNull @Positive Long id){
		analiseRepository.deleteById(id);
	}
}
