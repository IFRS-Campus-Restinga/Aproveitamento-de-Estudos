package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.CoordenadorDTO;
import br.com.aproveitamento.model.Coordenador;
import br.com.aproveitamento.repository.CoordenadorRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CoordenadorService {

	private CoordenadorRepository coordenadorRepository;
	
	public CoordenadorService(CoordenadorRepository coordenadorRepository) {
		super();
		this.coordenadorRepository = coordenadorRepository;
	}
	
	public List<CoordenadorDTO> list(){
		ArrayList<CoordenadorDTO> coordenadoresDTO = new ArrayList<CoordenadorDTO>();
		for(Coordenador coordenador: coordenadorRepository.findAll()){
			CoordenadorDTO coordenadorDTO = new CoordenadorDTO(coordenador.getId(), coordenador.getNome() ,coordenador.getEmail(), false, true, coordenador.getTipo(), coordenador.getSiape(), coordenador.getCurso());
			coordenadoresDTO.add(coordenadorDTO);
		}
		return coordenadoresDTO;
	}
	
	public List<CoordenadorDTO> listByIdCurso(Long id){
		ArrayList<CoordenadorDTO> coordenadoresDTO = new ArrayList<CoordenadorDTO>();
		for(Coordenador coordenador: coordenadorRepository.findAll()){
			if(coordenador.getCurso().getId() == id){
				CoordenadorDTO coordenadorDTO = new CoordenadorDTO(coordenador.getId(), coordenador.getNome() ,coordenador.getEmail(), false, true, coordenador.getTipo(), coordenador.getSiape(), coordenador.getCurso());
				coordenadoresDTO.add(coordenadorDTO);
			}
		}
		return coordenadoresDTO;
	}

	public Coordenador findById(@NotNull @Positive Long id){
		Optional<Coordenador> coordenador = coordenadorRepository.findById(id);
		if(!coordenador.isPresent()) return null;
		return coordenador.get();
	}
	
	public Coordenador create(@Valid @NotNull Coordenador coordenador){
		return coordenadorRepository.save(coordenador);
	}
	
	public Coordenador update(@Valid Coordenador coordenador){
		return coordenadorRepository.save(coordenador);
	}
	
	public void delete(@NotNull @Positive Long id){
		coordenadorRepository.deleteById(id);
	}
}
