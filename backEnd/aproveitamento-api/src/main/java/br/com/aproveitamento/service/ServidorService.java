package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Servidor;
import br.com.aproveitamento.repository.ServidorRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class ServidorService {

	private ServidorRepository servidorRepository;
	
	public ServidorService(ServidorRepository servidorRepository){
		super();
		this.servidorRepository = servidorRepository;
	}
	
	public List<Servidor> list(){
		return servidorRepository.findAll();
	}
	
	public Servidor findById(@NotNull @Positive Long id){
		Optional<Servidor> servidor = servidorRepository.findById(id);
		if(!servidor.isPresent()) return null;
		return servidor.get();
	}
	
	public Servidor create(@Valid @NotNull Servidor servidor){
		return servidorRepository.save(servidor);
	}
	
	public Servidor update(@Valid Servidor servidor){
		return servidorRepository.save(servidor);
	}
	
	public void delete(@NotNull @Positive Long id){
		servidorRepository.deleteById(id);
	}
}
