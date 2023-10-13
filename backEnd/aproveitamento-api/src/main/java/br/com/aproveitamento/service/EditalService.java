package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.repository.EditalRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class EditalService {
	
	private EditalRepository editalRepository;
	
	public EditalService(EditalRepository editalRepository) {
		super();
		this.editalRepository = editalRepository;
	}
	
	public List<Edital> list(){
		return editalRepository.findAll();
	}
	
	public Edital findById(@NotNull @Positive Long id){
		Optional<Edital> edital = editalRepository.findById(id);
		if(!edital.isPresent()) return null;
		return edital.get();
	}
	
	public Edital create(@Valid @NotNull Edital edital){
		return editalRepository.save(edital);
	}
	
	public Edital update(@Valid Edital edital){
		return editalRepository.save(edital);
	}
	
	public void delete(@NotNull @Positive Long id){
		editalRepository.deleteById(id);
	}

}
