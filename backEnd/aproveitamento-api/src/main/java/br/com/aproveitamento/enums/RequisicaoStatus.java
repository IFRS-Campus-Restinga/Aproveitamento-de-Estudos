package br.com.aproveitamento.enums;

public enum RequisicaoStatus {
	
	SOLICITACAO_CRIADA("Solicitação-criada"),
    APROVADA_PELO_ENSINO("Aprovada-pelo-ensino"),
	PROVA_AGENDADA("Prova_agendada"),
	APROVADA_PELO_PROFESSOR("Aprovada_pelo_professor"),
	APROVADA_PELO_COORDENADOR("Aprovada_pelo_coordenador"),
	DEFERIDA("Deferida"), 
	INDEFERIDA("Indeferida");

    private String value;

    private RequisicaoStatus(String value){
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
