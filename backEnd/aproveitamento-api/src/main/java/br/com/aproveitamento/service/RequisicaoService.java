package br.com.aproveitamento.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.RequisicaoDTO;
import br.com.aproveitamento.model.Aluno;
import br.com.aproveitamento.model.Analise;
import br.com.aproveitamento.model.Anexo;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.repository.AlunoRepository;
import br.com.aproveitamento.repository.AnaliseRepository;
import br.com.aproveitamento.repository.AnexoRepository;
import br.com.aproveitamento.repository.DisciplinaRepository;
import br.com.aproveitamento.repository.EditalRepository;
import br.com.aproveitamento.repository.RequisicaoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class RequisicaoService {
	
	private RequisicaoRepository requisicaoRepository;
	private AlunoRepository alunoRepository;
	private EditalRepository editalRepository;
	private DisciplinaRepository disciplinaRepository;
	private AnaliseRepository analiseRepository;
	private AnexoRepository anexoRepository; 
	
	public RequisicaoService(RequisicaoRepository requisicaoRepository,
							AlunoRepository alunoRepository,
							EditalRepository editalRepository,
							DisciplinaRepository disciplinaRepository,
							AnaliseRepository analiseRepository,
							AnexoRepository anexoRepository 
							){
		super();
		this.requisicaoRepository = requisicaoRepository;
		this.alunoRepository = alunoRepository;
		this.editalRepository = editalRepository;
		this.disciplinaRepository = disciplinaRepository;
		this.analiseRepository = analiseRepository;
		this.anexoRepository = anexoRepository;
	}
	
	public List<RequisicaoDTO> list(){
		List<Requisicao> requisicoes = requisicaoRepository.findAll();
		return requisicoes.stream().map( requisicao ->{
			var requisicaoDTO = this.toModel(requisicao);
			return requisicaoDTO;
		}).collect(Collectors.toList());	 
	}
	
	public Requisicao findById(@NotNull @Positive Long id){
		Optional<Requisicao> requisicao = requisicaoRepository.findById(id);
		if(!requisicao.isPresent()) return null;
		return requisicao.get();
	}
	
	public RequisicaoDTO createOrUpdate(@Valid @NotNull RequisicaoDTO requisicaoDTO){
		return this.toEntity(requisicaoDTO);
	}
		
	public void delete(@NotNull @Positive Long id){
		requisicaoRepository.deleteById(id);
	}

	private RequisicaoDTO toModel(Requisicao requisicao){

		return new RequisicaoDTO(requisicao.getId(), 
				requisicao.getTipo(), 
				requisicao.getStatus(), 
				requisicao.getDataCriacao(),
				requisicao.getExperienciasAnteriores(), 
				requisicao.getDataAgendamentoProva(),
				requisicao.getNotaDaProva(),
				requisicao.getDiciplinaCursaAnteriormente(), 
				requisicao.getNotaObtida(), requisicao.getCargaHoraria(), 
				requisicao.getAnalises(), requisicao.getAnexos(), 
				requisicao.getAluno().getId(),
				requisicao.getEdital().getId(),
				requisicao.getDisciplina().getId());
	}

	private RequisicaoDTO toEntity(RequisicaoDTO requisicaoDTO){

		if(requisicaoDTO == null){
			return null;
		}

		Requisicao requisicao = new Requisicao();
		
		if(requisicaoDTO.id() != null){
			requisicao.setId(requisicaoDTO.id());
		}
		requisicao.setTipo(requisicaoDTO.tipo());
		requisicao.setStatus(requisicaoDTO.status());
		requisicao.setDataCriacao(requisicaoDTO.dataCriacao());
		requisicao.setExperienciasAnteriores(requisicaoDTO.experienciasAnteriores());
		requisicao.setDataAgendamentoProva(requisicaoDTO.dataAgendamentoProva());
		requisicao.setNotaDaProva(requisicaoDTO.notaDaProva());
		requisicao.setDiciplinaCursaAnteriormente(requisicaoDTO.diciplinaCursaAnteriormente());
		requisicao.setNotaObtida(requisicaoDTO.notaObtida());
		requisicao.setCargaHoraria(requisicaoDTO.cargaHoraria());

		for (Analise a : requisicaoDTO.analises()) {
			requisicao.getAnalises().add(a);
		}

		for (Anexo a : requisicaoDTO.anexos()) {
			requisicao.getAnexos().add(a);
		}

		Optional<Aluno> aluno = alunoRepository.findById(requisicaoDTO.aluno_id());
		if(!aluno.isPresent()){
			return null;
		}
		requisicao.setAluno(aluno.get());

		Optional<Edital> edital = editalRepository.findById(requisicaoDTO.edital_id());
		if(!edital.isPresent()){
			return null;
		}
		requisicao.setEdital(edital.get());

		Optional<Disciplina> disciplina = disciplinaRepository.findById(requisicaoDTO.diciplina_id());
		if(!disciplina.isPresent()){
			return null;
		}
		requisicao.setDisciplina(disciplina.get());

		requisicaoRepository.save(requisicao);

		aluno.get().getRequisicoes().add(requisicao);
		edital.get().getRequisicoes().add(requisicao);
		disciplina.get().getRequisicoes().add(requisicao);

		alunoRepository.save(aluno.get());
		editalRepository.save(edital.get());
		disciplinaRepository.save(disciplina.get());

		return this.toModel(requisicao);
	}
}
