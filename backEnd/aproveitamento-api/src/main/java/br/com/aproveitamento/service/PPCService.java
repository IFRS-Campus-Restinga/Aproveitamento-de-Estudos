package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.PpcDTO;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.PPCRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class PPCService {

    private PPCRepository ppcRepository;

    public PPCService(PPCRepository ppcRepository) {
        super();
        this.ppcRepository = ppcRepository;
    }

    public List<PPC> list() {
        return ppcRepository.findAll();
    }

    public PPC findById(@NotNull @Positive Long id) {
        Optional<PPC> ppc = ppcRepository.findById(id);
        if (!ppc.isPresent())
            return null;
        return ppc.get();
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
}
