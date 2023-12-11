package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.DisciplinaDTO;
import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.CursoRepository;
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
    private CursoRepository cursoRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository, PPCRepository ppcRepository, CursoRepository cursoRepository) {
        super();
        this.disciplinaRepository = disciplinaRepository;
        this.ppcRepository = ppcRepository;
        this.cursoRepository = cursoRepository;
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
            return disciplina;
        }).collect(Collectors.toList());
         
        d.setDisciplinas(disciplinas);
       
        ppcRepository.save(d);
        return d;
    }

    public List<Disciplina> listAlternative() {
        return disciplinaRepository.findAll();
    }

    public Disciplina createOrUpdateDisciplina(@Valid @NotNull DisciplinaDTO disciplinaRequest) {

        Disciplina disciplina = obterDisciplinaParaAtualizar(disciplinaRequest.id());

        PPC ppc = ppcRepository.findById(disciplinaRequest.ppc_id()).orElseThrow(() -> new IllegalArgumentException("PPC não encontrado"));

        Disciplina d1 = null;
        if (disciplinaRequest.id() != null) {
            Optional<Disciplina> d = disciplinaRepository.findById(disciplinaRequest.id());
            if (d.isPresent()) {
                d1 = d.get();
            }
        }

        //Disciplina disciplina = (d1 != null) ? d1 : new Disciplina();
        disciplina.setId(disciplinaRequest.id());
        disciplina.setNome(disciplinaRequest.nome());
        disciplina.setCodDisciplina(disciplinaRequest.codDisciplina());
        disciplina.setCargaHoraria(disciplinaRequest.cargaHoraria());
        disciplina.setPpc(ppc);


        return disciplinaRepository.save(disciplina);
    }
  
    private Disciplina obterDisciplinaParaAtualizar(Long id) {
		  return id != null ? disciplinaRepository.findById(id).orElseGet(Disciplina::new) : new Disciplina();
	  }

}
