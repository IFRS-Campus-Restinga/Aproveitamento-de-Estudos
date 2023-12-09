package br.com.aproveitamento.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.aproveitamento.dto.PpcCreateDTO;
import br.com.aproveitamento.dto.PpcDTO;
import br.com.aproveitamento.dto.PpcReadDTO;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.service.PPCService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/ppc")
public class PPCController {

    @Autowired
    private PPCService ppcService;

    @GetMapping
    public @ResponseBody List<PPC> list() {
        return ppcService.list();
    }

    @GetMapping("/ppcs")
    public @ResponseBody List<PpcReadDTO> listAlternative() {
        return ppcService.listAlternative();
    }

    @GetMapping("/{id}")
    public PpcCreateDTO findById(@PathVariable @NotNull @Positive Long id) {
        return ppcService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PPC> create(@RequestBody @NotNull @Valid PpcCreateDTO ppc) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ppcService.createPPC(ppc));
    }

    @PostMapping("/disciplina")
    public ResponseEntity<PPC> createDiscipline(@RequestBody @NotNull @Valid PpcDTO ppc) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ppcService.createDiscipline(ppc));
    }

    @PutMapping
    public PPC update(@RequestBody @Valid PPC ppc) {
        return ppcService.updateOrCreate(ppc);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        ppcService.delete(id);
    }

}