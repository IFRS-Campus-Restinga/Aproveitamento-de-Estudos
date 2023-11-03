package br.com.aproveitamento.service;

import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.CursoRepository;
import br.com.aproveitamento.repository.PpcRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;



@Validated
@Service
public class PpcService {

    private PpcRepository ppcRepository;

    public PpcService(PpcRepository ppcRepository) {
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

}

