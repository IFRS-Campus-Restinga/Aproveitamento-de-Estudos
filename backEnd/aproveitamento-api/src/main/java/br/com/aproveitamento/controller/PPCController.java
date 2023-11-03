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

import br.com.aproveitamento.dto.PpcDTO;
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

    @GetMapping("/{id}")
    public PPC findById(@PathVariable @NotNull @Positive Long id) {
        return ppcService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PPC> create(@RequestBody @NotNull @Valid PPC ppc) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ppcService.create(ppc));
    }

    @PostMapping("/disciplina")
    public ResponseEntity<PPC> createDisciplina(@RequestBody @NotNull @Valid PpcDTO ppc) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ppcService.createDicplina(ppc));
    }

    @PutMapping
    public PPC update(@RequestBody @Valid PPC ppc) {
        return ppcService.update(ppc);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        ppcService.delete(id);
    }

}