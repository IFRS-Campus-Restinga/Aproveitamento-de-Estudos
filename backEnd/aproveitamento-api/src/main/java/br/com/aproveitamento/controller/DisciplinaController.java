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

import br.com.aproveitamento.dto.DisciplinaDTO;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.service.DisciplinaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/disciplina")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService;

    @GetMapping
    public @ResponseBody List<DisciplinaDTO> list() {
        return disciplinaService.list();
    }

    @GetMapping("/{id}")
    public DisciplinaDTO findById(@PathVariable @NotNull @Positive Long id) {
        return disciplinaService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Disciplina> create(@RequestBody @NotNull @Valid Disciplina disciplina) {
        return ResponseEntity.status(HttpStatus.CREATED).body(disciplinaService.create(disciplina));
    }
    @PostMapping("/disciplina")
    public ResponseEntity<Disciplina> createDisciplina(@RequestBody @NotNull @Valid DisciplinaDTO disciplina) {
        return ResponseEntity.status(HttpStatus.CREATED).body(disciplinaService.createOrUpdateDisciplina(disciplina));
    }

    @PutMapping
    public Disciplina update(@RequestBody @Valid Disciplina disciplina) {
        return disciplinaService.update(disciplina);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        disciplinaService.delete(id);
    }
    
    @GetMapping("/list")
    public @ResponseBody List<Disciplina> listAlternative() {
        return disciplinaService.listAlternative();
    }

}
