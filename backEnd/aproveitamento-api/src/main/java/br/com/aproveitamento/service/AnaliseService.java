package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.AnaliseDTO;
import br.com.aproveitamento.enums.converters.RequisicaoStatusConverter;
import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.model.Servidor;
import br.com.aproveitamento.repository.AnaliseRepository;
import br.com.aproveitamento.repository.RequisicaoRepository;
import br.com.aproveitamento.repository.ServidorRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class AnaliseService {

	private AnaliseRepository analiseRepository;
	private RequisicaoRepository requisicaoRepository;
	private ServidorRepository servidorRepository;
	
	public AnaliseService(AnaliseRepository analiseRepository, RequisicaoRepository requisicaoRepository, ServidorRepository servidorRepository){
		super();
		this.analiseRepository = analiseRepository;
		this.requisicaoRepository = requisicaoRepository;
		this.servidorRepository = servidorRepository;
	}
	
	public List<Analise> list(){
		return analiseRepository.findAll();
	}
	
	public Analise findById(@NotNull @Positive Long id){
		Optional<Analise> analise = analiseRepository.findById(id);
		if(!analise.isPresent()) return null;
		return analise.get();
	}
	
	public Analise create(@Valid @NotNull AnaliseDTO analiseDto){

		Requisicao requisicao = new Requisicao();
		Analise analise = new Analise();
		Servidor servidor = new Servidor();
		analise.setParecer(analiseDto.parecer());
		analise.setStatus(analiseDto.status());

		if(analiseDto.requisicao_id() != null && analiseDto.requisicao_id() > 0){

			Optional<Requisicao> r = requisicaoRepository.findById(analiseDto.requisicao_id());
			if(!r.isPresent()) return null;
			requisicao = r.get();
			analise.setRequisicao(requisicao);
			requisicao.setStatus(RequisicaoStatusConverter.convertToEntityRequest(analiseDto.status()));
			requisicao.getAnalises().add(analise);

		}

		if(analiseDto.servidor_id() != null && analiseDto.servidor_id() > 0){

			Optional<Servidor> s = servidorRepository.findById(analiseDto.servidor_id());
			if(!s.isPresent()) return null;
			servidor = s.get();
			analise.setServidor(servidor);
			servidor.getAnalises().add(analise);
		}

		analiseRepository.save(analise);
		requisicaoRepository.save(requisicao);
		servidorRepository.save(servidor);

		return analise;
	}
	
	public Analise update(@Valid Analise analise){
		return analiseRepository.save(analise);
	}
	
	public void delete(@NotNull @Positive Long id){
		analiseRepository.deleteById(id);
	}

	public List<Analise> listByIdRequisicao(@NotNull @Positive Long id) {
		List<Analise> analises = new ArrayList<Analise>();
		for(Analise a: analiseRepository.findAll()){
			if(a.getRequisicao().getId() == id){
				analises.add(a);
			}
		}

		return analises;
	}
}
