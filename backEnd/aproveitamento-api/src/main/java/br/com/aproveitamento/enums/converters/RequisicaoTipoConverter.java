package br.com.aproveitamento.enums.converters;

import java.util.stream.Stream;

import br.com.aproveitamento.enums.RequisicaoTipo;
import jakarta.persistence.AttributeConverter;

public class RequisicaoTipoConverter implements AttributeConverter<RequisicaoTipo, String> {
	
	@Override
	public String convertToDatabaseColumn(RequisicaoTipo requisicaoTipo) {
		if(requisicaoTipo == null){
            return null;
        }
        return requisicaoTipo.getValue();
	}

	@Override
	public RequisicaoTipo convertToEntityAttribute(String value) {
		if(value == null){
            return null;
        }
        return Stream.of(RequisicaoTipo.values())
        .filter(c -> c.getValue().equals(value))
        .findFirst()
        .orElseThrow(IllegalArgumentException::new);
	}
}
