package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.repository.CursoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CursoService {

    private CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        super();
        this.cursoRepository = cursoRepository;
    }

    public List<Curso> list() {
        return cursoRepository.findAll();
    }

    public Curso findById(@NotNull @Positive Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        if (!curso.isPresent())
            return null;
        return curso.get();
    }

    public Curso create(@Valid @NotNull Curso curso) {
        return cursoRepository.save(curso);
    }

    public Curso update(@Valid Curso curso) {
        return cursoRepository.save(curso);
    }

    public void delete(@NotNull @Positive Long id) {
        cursoRepository.deleteById(id);
    }

}