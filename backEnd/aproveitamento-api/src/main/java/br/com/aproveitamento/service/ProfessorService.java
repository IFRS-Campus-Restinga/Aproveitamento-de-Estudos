package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Professor;
import br.com.aproveitamento.repository.ProfessorRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class ProfessorService {
	
	private ProfessorRepository professorRepository;

	public ProfessorService(ProfessorRepository professorRepository) {
		super();
		this.professorRepository = professorRepository;
	}
	
	public List<Professor> list(){
		return professorRepository.findAll();
	}
	
	public Professor findById(@NotNull @Positive Long id){
		Optional<Professor> professor = professorRepository.findById(id);
		if(!professor.isPresent()) return null;
		return professor.get();
	}
	
	public Professor create(@Valid @NotNull Professor professor){
		return professorRepository.save(professor);
	}
	
	public Professor update(@Valid Professor professor){
		return professorRepository.save(professor);
	}
	
	public void delete(@NotNull @Positive Long id){
		professorRepository.deleteById(id);
	}

}
