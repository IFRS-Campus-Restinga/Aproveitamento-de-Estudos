package br.com.aproveitamento.dto;

import java.util.List;

public record CursoDTO(
        Long id,
        String nome,
        Long coordenador_id,
        List<CoordenadorDTO> coordenadores) {
}
