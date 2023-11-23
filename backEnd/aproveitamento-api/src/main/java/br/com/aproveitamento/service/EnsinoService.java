package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Ensino;
import br.com.aproveitamento.repository.EnsinoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class EnsinoService {
	
	private EnsinoRepository ensinoRepository;
	
	public EnsinoService(EnsinoRepository ensinoRepository) {
		super();
		this.ensinoRepository = ensinoRepository;
	}
	
	public List<Ensino> list(){
		return ensinoRepository.findAll();
	}
	
	public Ensino findById(@NotNull @Positive Long id){
		Optional<Ensino> ensino = ensinoRepository.findById(id);
		if(!ensino.isPresent()) return null;
		return ensino.get();
	}
	
	public Ensino create(@Valid @NotNull Ensino ensino){
		return ensinoRepository.save(ensino);
	}
	
	public Ensino update(@Valid Ensino ensino){
		return ensinoRepository.save(ensino);
	}
	
	public void delete(@NotNull @Positive Long id){
		ensinoRepository.deleteById(id);
	}
}
