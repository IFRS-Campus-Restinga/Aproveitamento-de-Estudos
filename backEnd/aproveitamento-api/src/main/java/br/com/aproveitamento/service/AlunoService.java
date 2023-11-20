package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.AlunoDTO;
import br.com.aproveitamento.model.Aluno;
import br.com.aproveitamento.repository.AlunoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class AlunoService {

	private AlunoRepository alunoRepository;
	
	public AlunoService(AlunoRepository alunoRepository) {
		super();
		this.alunoRepository = alunoRepository;
	}
	
	public List<AlunoDTO> list(){
		ArrayList<AlunoDTO> alunosDTO = new ArrayList<AlunoDTO>();
		for(Aluno aluno: alunoRepository.findAll()){
			AlunoDTO alunoDTO = new AlunoDTO(aluno.getId(), aluno.getNome() ,aluno.getEmail(), false, aluno.getTipo(),  aluno.getMatricula(), aluno.getDataIngresso(), aluno.getCurso());
			alunosDTO.add(alunoDTO);
		}
		return alunosDTO;
	}
	
	public AlunoDTO findById(@NotNull @Positive Long id){
		Optional<Aluno> aluno = alunoRepository.findById(id);
		if(!aluno.isPresent()) return null;
		return new AlunoDTO(aluno.get().getId(), aluno.get().getNome() ,aluno.get().getEmail(), false, aluno.get().getTipo(),  aluno.get().getMatricula(), aluno.get().getDataIngresso(), aluno.get().getCurso());
	}
	
	public Aluno create(@Valid @NotNull Aluno aluno){
		return alunoRepository.save(aluno);
	}
	
	public Aluno update(@Valid Aluno aluno){
		return alunoRepository.save(aluno);
	}
	
	public void delete(@NotNull @Positive Long id){
		alunoRepository.deleteById(id);
	}
}
