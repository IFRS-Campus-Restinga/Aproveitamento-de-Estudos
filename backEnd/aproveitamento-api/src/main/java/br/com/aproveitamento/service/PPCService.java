package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.PpcCreateDTO;
import br.com.aproveitamento.dto.PpcDTO;
import br.com.aproveitamento.dto.PpcReadDTO;
import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.CursoRepository;
import br.com.aproveitamento.repository.PPCRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class PPCService {

    private PPCRepository ppcRepository;
    private CursoRepository cursoRepository;

    public PPCService(PPCRepository ppcRepository, CursoRepository cursoRepository) {
        super();
        this.ppcRepository = ppcRepository;
        this.cursoRepository = cursoRepository;
    }

    public List<PPC> list() {
        return ppcRepository.findAll();
    }

    public PpcCreateDTO findById(@NotNull @Positive Long id) {
        Optional<PPC> ppc = ppcRepository.findById(id);
        if (!ppc.isPresent()) return null;
        return new PpcCreateDTO(ppc.get().getId().toString(), ppc.get().getCurso().getId(), ppc.get().getNomePPC(), ppc.get().getAno());
    }

    public PPC create(@Valid @NotNull PPC ppc) {
        return ppcRepository.save(ppc);
    }
    
    public PPC update(@Valid PPC ppc) {
        return ppcRepository.save(ppc);
    }

    public void delete(@NotNull @Positive Long id) {
        ppcRepository.deleteById(id);
    }

    public PPC createDiscipline(@Valid @NotNull PpcDTO ppcRequest) {

        PPC p1 = null;
 
        if (ppcRequest.id() != null || !ppcRequest.id().equals("")) {
            Optional<PPC> p = ppcRepository.findById(Long.parseLong(ppcRequest.id()));
            if (!p.isPresent()) {
                p1 = new PPC();
            } else {
                p1 = p.get();
            }
        }
        PPC ppc = p1;
        ppc.setNomePPC(ppcRequest.nomePCC());
        ppc.setAno(ppcRequest.ano());

        Disciplina disciplina = ppcRequest.disciplinas().get(0);
        disciplina.setPpc(ppc);

        ppc.getDisciplinas().add(disciplina);
        ppcRepository.save(ppc);
        return ppc;
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
    
    public PPC createPPC(@Valid @NotNull PpcCreateDTO ppcRequest) {
        PPC p1 = new PPC();
        Curso curso = new Curso();
        
        if (ppcRequest.id() != null && !ppcRequest.id().equals("")) {
            Optional<PPC> a = ppcRepository.findById(Long.parseLong(ppcRequest.id()));
            if (!a.isPresent()) {
                return null;
            } else {
                p1 = a.get();
            }
        }
        PPC ppc = p1;
    
        ppc.setNomePPC(ppcRequest.nomePPC());
        ppc.setAno(ppcRequest.ano());
        if(ppcRequest.curso_id() != null && ppcRequest.curso_id() > 0){
            Optional<Curso> c = cursoRepository.findById(ppcRequest.curso_id());
            if(!c.isPresent()) return null;
            curso = c.get();
            ppc.setCurso(curso);
            curso.getPPCs().add(ppc);
        } else {
            return null;
        }
    
        ppcRepository.save(ppc);
        cursoRepository.save(curso);
        return ppc;
    }
    
    public PPC updateOrCreate(@Valid @NotNull PPC ppc) {

        PPC p = new PPC();
        if (ppc.getId() != null) {
            p.setId(ppc.getId());
        }
        p.setNomePPC(ppc.getNomePPC());
        p.setAno(ppc.getAno());

        if (ppc.getCurso() != null) {
            p.setCurso(ppc.getCurso());
        }

        ppcRepository.save(p);
        return p;
    }

    public List<PpcReadDTO> listAlternative() {
        List<PpcReadDTO> ppcs = new ArrayList<PpcReadDTO>();
        for(PPC ppc : ppcRepository.findAll()){
            ppcs.add(new PpcReadDTO(ppc.getId(), ppc.getCurso().getId(), ppc.getNomePPC(), ppc.getAno(), ppc.getCurso().getNome()));
        }
        ppcRepository.findAll();
        return ppcs;
    }
}
