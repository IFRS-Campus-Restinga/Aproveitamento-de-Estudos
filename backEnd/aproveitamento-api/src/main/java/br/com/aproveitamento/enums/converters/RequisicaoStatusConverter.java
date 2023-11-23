package br.com.aproveitamento.enums.converters;

import java.util.stream.Stream;

import br.com.aproveitamento.enums.RequisicaoStatus;
import jakarta.persistence.AttributeConverter;

public class RequisicaoStatusConverter implements AttributeConverter<RequisicaoStatus, String>{
	
	@Override
	public String convertToDatabaseColumn(RequisicaoStatus statusRequisicao) {
		if(statusRequisicao == null){
            return null;
        }
        return statusRequisicao.getValue();
	}

	@Override
	public RequisicaoStatus convertToEntityAttribute(String value) {
		if(value == null){
            return null;
        }
        return Stream.of(RequisicaoStatus.values())
        .filter(c -> c.getValue().equals(value))
        .findFirst()
        .orElseThrow(IllegalArgumentException::new);
	}

}
