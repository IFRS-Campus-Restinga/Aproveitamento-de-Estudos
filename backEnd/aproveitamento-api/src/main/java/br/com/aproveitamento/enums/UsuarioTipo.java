package br.com.aproveitamento.enums;

public enum UsuarioTipo {
	
	ALUNO("Aluno"),
    COORDENADOR("Coordenador"),
	ENSINO("Ensino"),
	PROFESSOR("Professor"),
	SERVIDOR("Servidor");

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
