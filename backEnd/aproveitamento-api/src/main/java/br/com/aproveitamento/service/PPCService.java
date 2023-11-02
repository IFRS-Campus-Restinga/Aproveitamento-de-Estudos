package br.com.aproveitamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

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
}
