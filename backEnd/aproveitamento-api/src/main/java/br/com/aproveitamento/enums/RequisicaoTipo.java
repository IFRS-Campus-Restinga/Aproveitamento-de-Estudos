package br.com.aproveitamento.enums;

public enum RequisicaoTipo {
	
	APROVEITAMENTO("Aproveitamento"),
    CERTIFICACAO("Certificacao");

    private String value;

    private RequisicaoTipo(String value){
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
