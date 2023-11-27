package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.DisciplinaDTO;

import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.DisciplinaRepository;
import br.com.aproveitamento.repository.PPCRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class DisciplinaService {

    private DisciplinaRepository disciplinaRepository;
    private PPCRepository ppcRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository, PPCRepository ppcRepository) {
        super();
        this.disciplinaRepository = disciplinaRepository;
        this.ppcRepository = ppcRepository;
    }

    public List<DisciplinaDTO> list() {
        ArrayList<DisciplinaDTO> discilinasDTO = new ArrayList<DisciplinaDTO>();
		for(Disciplina disciplina: disciplinaRepository.findAll()){
			DisciplinaDTO disciplinaDTO = new DisciplinaDTO(disciplina.getId(), disciplina.getNome(), disciplina.getCodDisciplina(), disciplina.getCargaHoraria(), disciplina.getPpc().getId(), disciplina.getPpc().getCurso().getId());
			discilinasDTO.add(disciplinaDTO);
		}
		return discilinasDTO;
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

    public PPC UpdateOrCreate(@Valid @NotNull PPC ppc) {

        PPC d = new PPC();
        if (ppc.getId() != null) {
            d.setId(ppc.getId());
        }
        d.setNomePPC(ppc.getNomePPC());
        d.setAno(ppc.getAno());
        
         List<Disciplina> disciplinas = ppc.getDisciplinas().stream().map(ppcDisciplinas -> {
         var disciplina = new Disciplina();
         if(ppcDisciplinas.getId() != null){
         disciplina.setId(ppcDisciplinas.getId());
          }
          disciplina.setNome(ppcDisciplinas.getNome());
          disciplina.setCodDisciplina(ppcDisciplinas.getCodDisciplina());
          disciplina.setCargaHoraria(ppcDisciplinas.getCargaHoraria());
          //disciplina.setPpc(d);
          return disciplina;
          }).collect(Collectors.toList());
         
            d.setDisciplinas(disciplinas);
       
            ppcRepository.save(d);
            return d;
    }

}