package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.repository.DisciplinaRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class DisciplinaService {

    private DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        super();
        this.disciplinaRepository = disciplinaRepository;
    }

    public List<Disciplina> list() {
        return disciplinaRepository.findAll();
    }

    public Disciplina findById(@NotNull @Positive Long id) {
        Optional<Disciplina> disciplina = disciplinaRepository.findById(id);
        if (!disciplina.isPresent())
            return null;
        return disciplina.get();
    }

    public Disciplina create(@Valid @NotNull Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    public Disciplina update(@Valid Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    public void delete(@NotNull @Positive Long id) {
        disciplinaRepository.deleteById(id);
    }

}