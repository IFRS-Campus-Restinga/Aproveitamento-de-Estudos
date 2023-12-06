package br.com.aproveitamento.enums;

public enum UsuarioTipo {
	
	ALUNO("ALUNO"),
    COORDENADOR("COORDENADOR"),
	ENSINO("ENSINO"),
	PROFESSOR("PROFESSOR"),
	SERVIDOR("SERVIDOR");

    private String value;

    private UsuarioTipo(String value){
        this.value= value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}
