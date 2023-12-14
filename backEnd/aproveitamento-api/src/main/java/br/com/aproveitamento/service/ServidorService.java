package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.ServidorDTO;
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
	
	public List<ServidorDTO> list(){
		ArrayList<ServidorDTO> servidoresDTO = new ArrayList<ServidorDTO>();
		for(Servidor servidor: servidorRepository.findAll()){
			ServidorDTO servidorDTO = new ServidorDTO(servidor.getId(), servidor.getNome() ,servidor.getEmail(), false, servidor.getTipo(),  servidor.getSiape());
			servidoresDTO.add(servidorDTO);
		}
		return servidoresDTO;
	}
	
	public ServidorDTO findById(@NotNull @Positive Long id){
		Optional<Servidor> servidor = servidorRepository.findById(id);
		if(!servidor.isPresent()) return null;
		return new ServidorDTO(servidor.get().getId(), servidor.get().getNome(), servidor.get().getEmail(), false, servidor.get().getTipo(), servidor.get().getSiape());
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

	public Servidor createOrUpdateServidor(@Valid @NotNull ServidorDTO servidorRequest){

		Servidor s1 = null;
		if (servidorRequest.id() != null) {
			Optional<Servidor> s = servidorRepository.findById(servidorRequest.id());
			if (!s.isPresent()) {
				s1 = new Servidor();
			} else {
				s1 = s.get();
			}
		}
		Servidor servidor = s1;

		servidor.setId(servidorRequest.id());
		servidor.setNome(servidorRequest.nome());
		servidor.setEmail(servidorRequest.email());
		servidor.setAdmin(servidorRequest.admin());
		servidor.setTipo(servidorRequest.tipo());
		servidor.setSiape(servidorRequest.siape());
		

		servidorRepository.save(servidor);
		return servidor;
	}

}
