package br.com.aproveitamento.service;


import java.io.File;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.dto.RequisicaoDTO;
import br.com.aproveitamento.enums.converters.RequisicaoStatusConverter;
import br.com.aproveitamento.enums.converters.RequisicaoTipoConverter;
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
		this.anexoRepository = anexoRepository;
	}
	
	public List<RequisicaoDTO> list(){
		List<Requisicao> requisicoes = requisicaoRepository.findAll();
		return requisicoes.stream().map( requisicao ->{
			var requisicaoDTO = this.toModel(requisicao);
			return requisicaoDTO;
		}).collect(Collectors.toList());	 
	}
	
	public RequisicaoDTO findById(@NotNull @Positive Long id){
		Optional<Requisicao> requisicao = requisicaoRepository.findById(id);
		if(!requisicao.isPresent()) return null;
		return toModel(requisicao.get());
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
		
		if(requisicaoDTO.id() != null && requisicaoDTO.id() != 0){
			Optional<Requisicao> requisicaoOPC = requisicaoRepository.findById(requisicaoDTO.id());
			if(!requisicaoOPC.isPresent()) return null;
			requisicao = requisicaoOPC.get();
			deleteArquivos(requisicao);
			//requisicao.setId(requisicaoDTO.id());
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
			a.setRequisicao(requisicao);
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

		Optional<Disciplina> disciplina = disciplinaRepository.findById(requisicaoDTO.disciplina_id());
		if(!disciplina.isPresent()){
			return null;
		}
		requisicao.setDisciplina(disciplina.get());

		requisicaoRepository.save(requisicao);

		for (Anexo a : requisicao.getAnexos()) {
			anexoRepository.save(a);
		}

		if(requisicaoDTO.id() == null && requisicaoDTO.id() == 0){
			aluno.get().getRequisicoes().add(requisicao);
			edital.get().getRequisicoes().add(requisicao);
			disciplina.get().getRequisicoes().add(requisicao);

			alunoRepository.save(aluno.get());
			editalRepository.save(edital.get());
			disciplinaRepository.save(disciplina.get());
		}

		return this.toModel(requisicao);
	}

	public RequisicaoDTO adapterDto(String id, String tipo, String status, String dataCriacao, String experienciasAnteriores, 
									String dataAgendamentoProva, String notaDaProva, String diciplinaCursaAnteriormente, String notaObtida, 
									String cargaHoraria, String aluno_id, String edital_id, String disciplina_id){
			
		RequisicaoDTO requisicaoDTO = new RequisicaoDTO(convertLong(id), 
														RequisicaoTipoConverter.convertToEntityRequest(tipo), 
														RequisicaoStatusConverter.convertToEntityRequest(status), 
														convertDateNow(dataCriacao), 
														experienciasAnteriores, 
														convertDate(dataAgendamentoProva), 
														convertDouble(notaDaProva), 
														convertInteger(diciplinaCursaAnteriormente), 
														convertDouble(notaObtida), 
														convertInteger(cargaHoraria), 
														new ArrayList<Analise>(), 
														new ArrayList<Anexo>(), 
														convertLong(aluno_id), 
														convertLong(edital_id), 
														convertLong(disciplina_id));
		return requisicaoDTO;

	}

	private Long convertLong(String value){
		if(value.equals("") || value == null){
			value = "0";
		}
		return Long.parseLong(value);
	}

	private Integer convertInteger(String value){
		if(value.equals("") || value == null){
			value = "0";
		}
		return Integer.parseInt(value);
	}

	private Double convertDouble(String value){
		if(value.equals("") || value == null){
			value = "0.0";
		}
		return Double.parseDouble(value);
	}

	private Date convertDate(String value){
		try {
			if(value.equals("")){
				return null;
			}
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date data = (Date) dateFormat.parse(value.toString());
			return data;
		} catch (Exception e) {
			return null;
		}
	}

	private Date convertDateNow(String value){
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date data = new Date();
			if(value.equals("")){
				data = (Date) dateFormat.parse(LocalDate.now().toString());
			}else{
				data = (Date) dateFormat.parse(value.toString());
			}
			return data;
		} catch (Exception e) {
			return null;
		}
	}

	private void deleteArquivos(Requisicao requisicao){
		if(!requisicao.getAnexos().isEmpty()){
			String directoryPath = requisicao.getAnexos().get(0).getPasta();
			File directory = new File(directoryPath);
			deleteDirectory(directory);
			int size = requisicao.getAnexos().size();
			for(int i = 0; i < size; i++ ){
				requisicao.getAnexos().remove(0);
			}
		}
	}

	private static void deleteDirectory(File directory) {
        if (directory.exists()) {
            if (directory.isDirectory()) {

                File[] files = directory.listFiles();
				
                if (files != null) {
                    for (File file : files) {
                        deleteDirectory(file);
                    }
                }
            }
            directory.delete();
        }
    }

}
