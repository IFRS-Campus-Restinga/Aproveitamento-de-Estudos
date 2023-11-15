package br.com.aproveitamento.dto;

import java.util.Date;
import java.util.List;

import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.model.Anexo;

public record RequisicaoDTO(
        Long id,
        RequisicaoTipo tipo,
        RequisicaoStatus status,
        Date dataCriacao,
        String experienciasAnteriores,
        Date dataAgendamentoProva,
        double notaDaProva,
        int diciplinaCursaAnteriormente,
        double notaObtida,
        int cargaHoraria,
        List<Analise> analises,
        List<Anexo> anexos,
        Long aluno_id,
        Long edital_id,
        Long diciplina_id ) {

}
	
