package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.aproveitamento.model.Etapa;
import br.com.aproveitamento.repository.EtapaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class EtapaService {
    
    private EtapaRepository etapaRepository;
	
	public EtapaService(EtapaRepository etapaRepository) {
		super();
		this.etapaRepository = etapaRepository;
	}
	
	public List<Etapa> list(){
		return etapaRepository.findAll();
	}
	
	public Etapa findById(@NotNull @Positive Long id){
		Optional<Etapa> etapa = etapaRepository.findById(id);
		if(!etapa.isPresent()) return null;
		return etapa.get();
	}
	
	public Etapa create(@Valid @NotNull Etapa etapa){
		return etapaRepository.save(etapa);
	}
	
	public Etapa update(@Valid Etapa etapa){
		return etapaRepository.save(etapa);
	}
	
	public void delete(@NotNull @Positive Long id){
		etapaRepository.deleteById(id);
	}
    
}
