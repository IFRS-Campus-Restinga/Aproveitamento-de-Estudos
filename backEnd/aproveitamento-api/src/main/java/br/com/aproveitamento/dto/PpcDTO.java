package br.com.aproveitamento.dto;

import java.util.List;

import br.com.aproveitamento.model.Disciplina;

public record PpcDTO(
        String id,
        String nomePCC,
        int ano,
        List<Disciplina> disciplinas) {

}
