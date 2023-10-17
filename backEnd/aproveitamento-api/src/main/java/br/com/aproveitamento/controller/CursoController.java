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

import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.service.CursoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/Curso")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public @ResponseBody List<Curso> list() {
        return cursoService.list();
    }

    @GetMapping("/{id}")
    public Curso findById(@PathVariable @NotNull @Positive Long id) {
        return cursoService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Curso> create(@RequestBody @NotNull @Valid Curso curso) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoService.create(curso));
    }

    @PutMapping
    public Curso update(@RequestBody @Valid Curso curso) {
        return cursoService.update(curso);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        cursoService.delete(id);
    }

}