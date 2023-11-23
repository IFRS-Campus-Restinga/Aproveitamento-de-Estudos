package br.com.aproveitamento.enums.converters;

import java.util.stream.Stream;

import br.com.aproveitamento.enums.UsuarioTipo;
import jakarta.persistence.AttributeConverter;

public class UsuarioTipoConverter implements AttributeConverter<UsuarioTipo, String> {

	@Override
	public String convertToDatabaseColumn(UsuarioTipo usuarioTipo) {
		if(usuarioTipo == null){
            return null;
        }
        return usuarioTipo.getValue();
	}

	@Override
	public UsuarioTipo convertToEntityAttribute(String value) {
		if(value == null){
            return null;
        }
        return Stream.of(UsuarioTipo.values())
        .filter(c -> c.getValue().equals(value))
        .findFirst()
        .orElseThrow(IllegalArgumentException::new);
	}

}
