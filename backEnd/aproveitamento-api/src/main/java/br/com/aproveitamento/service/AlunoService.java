package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

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
	
	public List<Aluno> list(){
		return alunoRepository.findAll();
	}
	
	public Aluno findById(@NotNull @Positive Long id){
		Optional<Aluno> aluno = alunoRepository.findById(id);
		if(!aluno.isPresent()) return null;
		return aluno.get();
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
