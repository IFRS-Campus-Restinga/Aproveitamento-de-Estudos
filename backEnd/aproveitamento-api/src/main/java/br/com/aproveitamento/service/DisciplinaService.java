package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.DisciplinaDTO;
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

    public DisciplinaDTO findById(@NotNull @Positive Long id) {
        Optional<Disciplina> disciplina = disciplinaRepository.findById(id);
        if (!disciplina.isPresent())
            return null;
        return new DisciplinaDTO(disciplina.get().getId(), disciplina.get().getNome(), disciplina.get().getCodDisciplina(), disciplina.get().getCargaHoraria(), disciplina.get().getPpc().getId(), disciplina.get().getPpc().getCurso().getId());
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

    public Disciplina UpdateOrCreate(@Valid @NotNull Disciplina disciplina) {

        Disciplina d = new Disciplina();
        if (disciplina.getId() != null) {
            d.setId(disciplina.getId());
        }
        d.setNome(disciplina.getNome());
        d.setCodDisciplina(disciplina.getCodDisciplina());
        d.setCargaHoraria(disciplina.getCargaHoraria());

        /*
         * List<Etapa> etapas = edital.getEtapas().stream().map(editalEtapas -> {
         * var etapa = new Etapa();
         * if(editalEtapas.getId() != null){
         * etapa.setId(editalEtapas.getId());
         * }
         * etapa.setNome(editalEtapas.getNome());
         * etapa.setDataInicio(editalEtapas.getDataInicio());
         * etapa.setDataFim(editalEtapas.getDataFim());
         * etapa.setAtor(editalEtapas.getAtor());
         * etapa.setEdital(e);
         * return etapa;
         * }).collect(Collectors.toList());
         * 
         * e.setEtapas(etapas);
         */
        disciplinaRepository.save(d);
        return d;
    }

}