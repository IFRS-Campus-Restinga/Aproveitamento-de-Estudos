package br.com.aproveitamento.controller;


import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.service.PpcService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/curso/ppc")
public class PpcController {

    @Autowired
    private PpcService ppcService;

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