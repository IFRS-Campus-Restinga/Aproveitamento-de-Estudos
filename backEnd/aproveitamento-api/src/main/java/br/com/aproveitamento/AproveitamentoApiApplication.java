package br.com.aproveitamento;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.aproveitamento.repository.AlunoRepository;
import br.com.aproveitamento.repository.AnaliseRepository;
import br.com.aproveitamento.repository.AnexoRepository;
import br.com.aproveitamento.repository.CoordenadorRepository;
import br.com.aproveitamento.repository.CursoRepository;
import br.com.aproveitamento.repository.DisciplinaRepository;
import br.com.aproveitamento.repository.EditalRepository;
import br.com.aproveitamento.repository.EnsinoRepository;
import br.com.aproveitamento.repository.EtapaRepository;
import br.com.aproveitamento.repository.PpcRepository;
import br.com.aproveitamento.repository.ProfessorRepository;
import br.com.aproveitamento.repository.RequisicaoRepository;
import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Aluno;
import br.com.aproveitamento.model.Coordenador;
import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.Ensino;
import br.com.aproveitamento.model.Etapa;
import br.com.aproveitamento.model.Professor;
import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.model.Edital;


@SpringBootApplication
public class AproveitamentoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AproveitamentoApiApplication.class, args);
	}
	
	@Bean
	CommandLineRunner initDatabase(	AlunoRepository alunoRepository,	
									CoordenadorRepository coordenadorRepository,
									ProfessorRepository ProfessorRepository,
									EnsinoRepository ensinoRepository,
									CursoRepository cursoRepository,
									PpcRepository PPCRepository,
									DisciplinaRepository disciplinaRepository,
									EditalRepository editalRepository,
									EtapaRepository etapaRepository,
									RequisicaoRepository requisicaoRepository,
									AnexoRepository anexoRepository,
									AnaliseRepository analiseRepository ){
		return args -> {
			
			Curso curso1 = new Curso("ADS");
			Curso curso2 = new Curso("Letras");
			
			PPC ppc1 = new PPC("PPC ADS", 2023, curso1);
			PPC ppc2 = new PPC("PPC Letras", 2023, curso2);
			
			curso1.getPPCs().add(ppc1);
			curso2.getPPCs().add(ppc2);
			
			Disciplina disciplina1 = new Disciplina("Prog I", 88, ppc1, 123);
			Disciplina disciplina2 = new Disciplina("Prog II", 88, ppc1, 124);
			Disciplina disciplina3 = new Disciplina("Literatura", 65, ppc2, 125);
			Disciplina disciplina4 = new Disciplina("Portugues", 65, ppc2, 126);
			
			ppc1.getDisciplinas().add(disciplina1);
			ppc1.getDisciplinas().add(disciplina2);
			ppc2.getDisciplinas().add(disciplina3);
			ppc2.getDisciplinas().add(disciplina4);
			
			cursoRepository.save(curso1);
			cursoRepository.save(curso2);
			
			PPCRepository.save(ppc1);
			PPCRepository.save(ppc1);
			
			disciplinaRepository.save(disciplina1);
			disciplinaRepository.save(disciplina2);
			disciplinaRepository.save(disciplina3);
			disciplinaRepository.save(disciplina4);
		
			Aluno aluno1 = new Aluno("jackson", "jack@teste.com", false, UsuarioTipo.ALUNO, "123456", "02/23", curso1);
			Aluno aluno2 = new Aluno("igor", "igor@teste.com", false, UsuarioTipo.ALUNO, "654123","01/23", curso2);
			
			alunoRepository.save(aluno1);
			alunoRepository.save(aluno2);
			
			curso1.getAlunos().add(aluno1);
			curso2.getAlunos().add(aluno2);
			
			Coordenador coordenador1 = new Coordenador("Yuri", "yuri@teste.com", true, UsuarioTipo.COORDENADOR, "987456", new Date(), new Date(), curso1);
			Coordenador coordenador2 = new Coordenador("João", "joão@teste.com", true, UsuarioTipo.COORDENADOR, "369852", new Date(), new Date(), curso2);
			
			coordenadorRepository.save(coordenador1);
			coordenadorRepository.save(coordenador2);
			
			curso1.getCoordenadores().add(coordenador1);
			curso2.getCoordenadores().add(coordenador2);
			
			Professor professor1 = new Professor("Ricardo", "ricardo@teste.com", true, UsuarioTipo.PROFESSOR, "258741");
			Professor professor2 = new Professor("Eliana", "eliana@teste.com", true, UsuarioTipo.PROFESSOR, "951357");
			
			ProfessorRepository.save(professor1);
			ProfessorRepository.save(professor2);
			
			Ensino ensino1 = new Ensino("Fulano", "fulano@teste.com", true, UsuarioTipo.ENSINO, "962478");
			Ensino ensino2 = new Ensino("Ciclino", "ciclano@teste.com", true, UsuarioTipo.ENSINO, "314658");
			
			ensinoRepository.save(ensino1);
			ensinoRepository.save(ensino2);
			
			cursoRepository.save(curso1);
			cursoRepository.save(curso2);

			System.out.println();
			
			Edital edital = new Edital("5001", new Date(), new Date());
			
			editalRepository.save(edital);
			
			Etapa etapa1 = new Etapa("Período de inscrições", new Date(), new Date(), UsuarioTipo.ALUNO, edital);
			Etapa etapa2 = new Etapa("Encaminhamento", new Date(), new Date(), UsuarioTipo.ENSINO, edital);
			Etapa etapa3 = new Etapa("Análise dos processos pelos docentes", new Date(), new Date(), UsuarioTipo.PROFESSOR, edital);
			Etapa etapa4 = new Etapa("Homologação dos coordenadores", new Date(), new Date(), UsuarioTipo.COORDENADOR, edital);
			Etapa etapa5 = new Etapa("Devolução dos processos à Coordenação", new Date(), new Date(), UsuarioTipo.COORDENADOR, edital);
			Etapa etapa6 = new Etapa("Processamento dos resultados pela Coordenação de Registros Escolares", new Date(), new Date(), UsuarioTipo.ENSINO, edital);
			
			etapaRepository.save(etapa1);
			etapaRepository.save(etapa2);
			etapaRepository.save(etapa3);
			etapaRepository.save(etapa4);
			etapaRepository.save(etapa5);
			etapaRepository.save(etapa6);
			
			edital.getEtapas().add(etapa1);
			edital.getEtapas().add(etapa2);
			edital.getEtapas().add(etapa3);
			edital.getEtapas().add(etapa4);
			edital.getEtapas().add(etapa5);
			edital.getEtapas().add(etapa6);
			
			editalRepository.save(edital);
			
			
			Requisicao requisicao1 = new Requisicao(RequisicaoTipo.APROVEITAMENTO, RequisicaoStatus.SOLICITACAO_CRIADA, new Date(),
													null, null, 0.00,
													2, 8.00, 80, 
													aluno1, edital, disciplina1);
			Requisicao requisicao2 = new Requisicao(RequisicaoTipo.CERTIFICACAO, RequisicaoStatus.SOLICITACAO_CRIADA, new Date(),
													"Prog II", new Date(), 0.00,
													0, 0.00, 0, 
													aluno1, edital, disciplina2);
			
			Requisicao requisicao3 = new Requisicao(RequisicaoTipo.APROVEITAMENTO, RequisicaoStatus.SOLICITACAO_CRIADA, new Date(),
													null, null, 0.00,
													3, 9.00, 80, 
													aluno2, edital, disciplina3);
			
			Requisicao requisicao4 = new Requisicao(RequisicaoTipo.CERTIFICACAO, RequisicaoStatus.SOLICITACAO_CRIADA, new Date(),
													"Portugues", new Date(), 0.00,
													0, 0.00, 0, 
													aluno1, edital, disciplina4);
			
			requisicaoRepository.save(requisicao1);
			requisicaoRepository.save(requisicao2);
			requisicaoRepository.save(requisicao3);
			requisicaoRepository.save(requisicao4);
			
			edital.getRequisicoes().add(requisicao1);
			edital.getRequisicoes().add(requisicao2);
			edital.getRequisicoes().add(requisicao3);
			edital.getRequisicoes().add(requisicao4);
			
			editalRepository.save(edital);


			
			/*
			Analise analise1 = new Analise();
			Analise analise2 = new Analise();
			Analise analise3 = new Analise();
			Analise analise4 = new Analise();
			*/
			
		};
	}
}
