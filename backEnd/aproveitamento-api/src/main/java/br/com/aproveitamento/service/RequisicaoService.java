package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.repository.RequisicaoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class RequisicaoService {
	
	private RequisicaoRepository requisicaoRepository;
	
	public RequisicaoService(RequisicaoRepository requisicaoRepository){
		super();
		this.requisicaoRepository = requisicaoRepository;
	}
	
	public List<Requisicao> list(){
		return requisicaoRepository.findAll();
	}
	
	public Requisicao findById(@NotNull @Positive Long id){
		Optional<Requisicao> requisicao = requisicaoRepository.findById(id);
		if(!requisicao.isPresent()) return null;
		return requisicao.get();
	}
	
	public Requisicao create(@Valid @NotNull Requisicao requisicao){
		return requisicaoRepository.save(requisicao);
	}
	
	public Requisicao update(@Valid Requisicao requisicao){
		return requisicaoRepository.save(requisicao);
	}
	
	public void delete(@NotNull @Positive Long id){
		requisicaoRepository.deleteById(id);
	}

}
