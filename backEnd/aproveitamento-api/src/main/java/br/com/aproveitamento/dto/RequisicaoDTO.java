package br.com.aproveitamento.dto;

import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.model.Anexo;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.Valid;

import java.util.Date;
import java.util.List;

import br.com.aproveitamento.validation.CurrentYearDate;

public record RequisicaoDTO(

    Long id,

    @Valid
    RequisicaoTipo tipo,

    RequisicaoStatus status,

    @Valid
    @CurrentYearDate
    Date dataCriacao,

    @Valid
    @Pattern(regexp = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$", 
                message = "O Experiências Anteriores não atende aos critérios de validação")
    @Size(min = 0, max = 120, message = "Experiências Anteriores deve ter entre 6 e 120 caracteres")
    String experienciasAnteriores,

    @CurrentYearDate
    Date dataAgendamentoProva,

    @DecimalMin(value = "0", message = "A nota da prova não pode ser menor que 0")
    @DecimalMax(value = "10", message = "A nota da prova não pode ser maior que 10")
    double notaDaProva,

    @Valid
    @Pattern(regexp = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$", 
                message = "O Disciplina cursada anteriormente não atende aos critérios de validação")
    @Size(min = 0, max = 120, message = "Disciplina cursada anteriormente deve ter entre 6 e 120 caracteres")
    String disciplinaCursaAnteriormente,

    
    @DecimalMin(value = "0", message = "Nota obtida não pode ser menor que 0")
    @DecimalMax(value = "10", message = "Nota obtida não pode ser maior que 10")
    double notaObtida,

    @DecimalMin(value = "0", message = "Carga horária não pode ser menor que 0")
    @DecimalMax(value = "1000", message = "Nota obtida não pode ser maior que 1000")
    int cargaHoraria,

    
    List<Analise> analises,

    
    List<Anexo> anexos,

    @Valid
    Long aluno_id,

    @Valid
    Long edital_id,

    @Valid
    Long disciplina_id
) {

        public RequisicaoDTO {
                // Verificação de experiências anteriores
                if (notaObtida == 0 || cargaHoraria == 0) {
                    String regex = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]{6,120}(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$";
                    if (experienciasAnteriores == null || !experienciasAnteriores.matches(regex)) {
                        throw new IllegalArgumentException("Experiências Anteriores inválidas");
                    }
                } else {
                    String regex = "^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]{6,120}(?:[.,]\\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\\s]*)*$";
                    if (disciplinaCursaAnteriormente == null || !disciplinaCursaAnteriormente.matches(regex)) {
                        throw new IllegalArgumentException("Disciplina cursada anteriormente inválida");
                    }
                    if (notaObtida < 0 || notaObtida > 10 || cargaHoraria < 0 || cargaHoraria > 1000) {
                        throw new IllegalArgumentException("Nota obtida ou carga horária inválidas");
                    }
                }
        
        
        }
}