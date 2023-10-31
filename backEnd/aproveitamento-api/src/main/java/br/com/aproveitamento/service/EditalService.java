package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.model.Etapa;
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
	
	public void delete(@NotNull @Positive Long id){
		editalRepository.deleteById(id);
	}

	public Edital UpdateOrCreate(@Valid @NotNull Edital edital){

		Edital e = new Edital();
		if(edital.getId() != null){
			e.setId(edital.getId());
		}
		e.setNumero(edital.getNumero());
		e.setDataInicio(edital.getDataInicio());
		e.setDataFim(edital.getDataFim());

		List<Etapa> etapas = edital.getEtapas().stream().map(editalEtapas -> {
			var etapa = new Etapa();
			if(editalEtapas.getId() != null){
				etapa.setId(editalEtapas.getId());
			}
			etapa.setNome(editalEtapas.getNome());
			etapa.setDataInicio(editalEtapas.getDataInicio());
			etapa.setDataFim(editalEtapas.getDataFim());
			etapa.setAtor(editalEtapas.getAtor());
			etapa.setEdital(e);
			return etapa;
		}).collect(Collectors.toList());

		e.setEtapas(etapas);
		editalRepository.save(e);
		return e;
	}
}
