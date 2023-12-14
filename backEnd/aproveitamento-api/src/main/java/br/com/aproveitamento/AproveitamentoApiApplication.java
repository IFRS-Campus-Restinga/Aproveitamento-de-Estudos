package br.com.aproveitamento;

import java.time.LocalDate;
import java.util.Date;

import java.time.temporal.ChronoUnit;



import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;

import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.Aluno;
import br.com.aproveitamento.model.Coordenador;
import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.model.Ensino;
import br.com.aproveitamento.model.Etapa;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.model.Professor;
import br.com.aproveitamento.model.Requisicao;
import br.com.aproveitamento.repository.AlunoRepository;
import br.com.aproveitamento.repository.AnaliseRepository;
import br.com.aproveitamento.repository.AnexoRepository;
import br.com.aproveitamento.repository.CoordenadorRepository;
import br.com.aproveitamento.repository.CursoRepository;
import br.com.aproveitamento.repository.DisciplinaRepository;
import br.com.aproveitamento.repository.EditalRepository;
import br.com.aproveitamento.repository.EnsinoRepository;
import br.com.aproveitamento.repository.EtapaRepository;
import br.com.aproveitamento.repository.PPCRepository;
import br.com.aproveitamento.repository.ProfessorRepository;
import br.com.aproveitamento.repository.RequisicaoRepository;


@SpringBootApplication
public class AproveitamentoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AproveitamentoApiApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(AlunoRepository alunoRepository,
			CoordenadorRepository coordenadorRepository,
			ProfessorRepository ProfessorRepository,
			EnsinoRepository ensinoRepository,
			CursoRepository cursoRepository,
			PPCRepository PPCRepository,
			DisciplinaRepository disciplinaRepository,
			EditalRepository editalRepository,
			EtapaRepository etapaRepository,
			RequisicaoRepository requisicaoRepository,
			AnexoRepository anexoRepository,
			AnaliseRepository analiseRepository) {

		return args -> {


			Curso curso1 = new Curso("ADS");
			Curso curso2 = new Curso("Letras");

			PPC ppc1 = new PPC("PPC ADS", 2023, curso1);
			PPC ppc2 = new PPC("PPC Letras", 2023, curso2);

			curso1.getPPCs().add(ppc1);
			curso2.getPPCs().add(ppc2);

			Disciplina disciplina1 = new Disciplina("Programacao I", 88, ppc1, "ABC-DEF123");
			Disciplina disciplina2 = new Disciplina("Programacao II", 88, ppc1, "ABC-DEF124");
			Disciplina disciplina3 = new Disciplina("Literatura", 65, ppc2, "ABC-DEF125");
			Disciplina disciplina4 = new Disciplina("Portugues", 65, ppc2, "ABC-DEF126");

			ppc1.getDisciplinas().add(disciplina1);
			ppc1.getDisciplinas().add(disciplina2);
			ppc2.getDisciplinas().add(disciplina3);
			ppc2.getDisciplinas().add(disciplina4);

			cursoRepository.save(curso1);
			cursoRepository.save(curso2);

			PPCRepository.save(ppc1);
			PPCRepository.save(ppc2);

			disciplinaRepository.save(disciplina1);
			disciplinaRepository.save(disciplina2);
			disciplinaRepository.save(disciplina3);
			disciplinaRepository.save(disciplina4);

			Aluno aluno1 = new Aluno("Jackson Balest", "jack@restinga.ifrs.edu.br", false,
					UsuarioTipo.ALUNO, "1234567890",
					"02/2022", curso1);
			Aluno aluno2 = new Aluno("Igor Farias", "igor@restinga.ifrs.edu.br", false,
					UsuarioTipo.ALUNO, "1122334455",
					"01/2023", curso2);

			try {
				alunoRepository.save(aluno1);
				alunoRepository.save(aluno2);
				curso1.getAlunos().add(aluno1);
				curso2.getAlunos().add(aluno2);

			} catch (Exception e) {
				// TODO: handle exception
			}

			Coordenador coordenador1 = new Coordenador("Yuri Albanes", "yuri@restinga.ifrs.edu.br", true, UsuarioTipo.COORDENADOR,
					"9874564587", new Date(), new Date(), curso1, true);
			Coordenador coordenador2 = new Coordenador("João Silva", "joão@restinga.ifrs.edu.br", true, UsuarioTipo.COORDENADOR,
					"3698523214", new Date(), new Date(), curso2, true);

			try {
				coordenadorRepository.save(coordenador1);
				coordenadorRepository.save(coordenador2);
				curso1.getCoordenadores().add(coordenador1);
				curso2.getCoordenadores().add(coordenador2);
			} catch (Exception e) {
				// TODO: handle exception
			}

			Professor professor1 = new Professor("Ricardo Luís", "ricardo@restinga.ifrs.edu.br", true, UsuarioTipo.PROFESSOR, "2587416678");
			Professor professor2 = new Professor("Eliana Pereira", "eliana@restinga.ifrs.edu.br", true, UsuarioTipo.PROFESSOR, "9513571589");

			try {
				ProfessorRepository.save(professor1);
				ProfessorRepository.save(professor2);

			} catch (Exception e) {
				// TODO: handle exceptiony
			}

			Ensino ensino1 = new Ensino("Fulano de Tal", "fulano@restinga.ifrs.edu.br", true, UsuarioTipo.ENSINO, "9624787767");
			Ensino ensino2 = new Ensino("Ciclino Jarbas", "ciclano@restinga.ifrs.edu.br", true, UsuarioTipo.ENSINO, "3146586478");

			try {
				ensinoRepository.save(ensino1);
				ensinoRepository.save(ensino2);

			} catch (Exception e) {
				// TODO: handle exception
			}


			cursoRepository.save(curso1);
			cursoRepository.save(curso2);
			
			Date hoje = new Date();
			Date amanha = new Date(hoje.getTime() + (24L * 60 * 60 * 1000));
			Date dayAfterTomorrow = new Date(amanha.getTime() + (24L * 60 * 60 * 1000));
			
			Edital edital = new Edital("5001522", hoje, amanha);
			Edital edital2 = new Edital("5001654", hoje, amanha);
			
			editalRepository.save(edital);
			editalRepository.save(edital2);
			
			Etapa etapa1 = new Etapa("Período de inscrições", hoje, amanha, UsuarioTipo.ALUNO, edital);
			Etapa etapa2 = new Etapa("Encaminhamento", hoje, amanha, UsuarioTipo.ENSINO, edital);
			Etapa etapa3 = new Etapa("Análise dos processos pelos docentes", hoje, amanha, UsuarioTipo.PROFESSOR, edital);
			Etapa etapa4 = new Etapa("Homologação dos coordenadores", hoje, amanha, UsuarioTipo.COORDENADOR, edital);
			Etapa etapa5 = new Etapa("Devolução dos processos à Coordenação", hoje, amanha, UsuarioTipo.COORDENADOR, edital);
			Etapa etapa6 = new Etapa("Processamento dos resultados pela Coordenação de Registros Escolares", hoje, amanha, UsuarioTipo.ENSINO, edital);
			
			Etapa etapa7 = new Etapa("Período de inscrições", hoje, amanha, UsuarioTipo.ALUNO, edital2);
			Etapa etapa8 = new Etapa("Encaminhamento", hoje, amanha, UsuarioTipo.ENSINO, edital2);
			Etapa etapa9 = new Etapa("Análise dos processos pelos docentes", hoje, amanha, UsuarioTipo.PROFESSOR, edital2);
			Etapa etapa10 = new Etapa("Homologação dos coordenadores", hoje, amanha, UsuarioTipo.COORDENADOR, edital2);
			Etapa etapa11 = new Etapa("Devolução dos processos à Coordenação", hoje, amanha, UsuarioTipo.COORDENADOR, edital2);
			Etapa etapa12 = new Etapa("Processamento dos resultados pela Coordenação de Registros Escolares", hoje, amanha, UsuarioTipo.ENSINO, edital2);

			etapaRepository.save(etapa1);
			etapaRepository.save(etapa2);
			etapaRepository.save(etapa3);
			etapaRepository.save(etapa4);
			etapaRepository.save(etapa5);
			etapaRepository.save(etapa6);

			etapaRepository.save(etapa7);
			etapaRepository.save(etapa8);
			etapaRepository.save(etapa9);
			etapaRepository.save(etapa10);
			etapaRepository.save(etapa11);
			etapaRepository.save(etapa12);

			edital.getEtapas().add(etapa1);
			edital.getEtapas().add(etapa2);
			edital.getEtapas().add(etapa3);
			edital.getEtapas().add(etapa4);
			edital.getEtapas().add(etapa5);
			edital.getEtapas().add(etapa6);

			edital2.getEtapas().add(etapa7);
			edital2.getEtapas().add(etapa8);
			edital2.getEtapas().add(etapa9);
			edital2.getEtapas().add(etapa10);
			edital2.getEtapas().add(etapa11);
			edital2.getEtapas().add(etapa12);

			editalRepository.save(edital);
			editalRepository.save(edital2);

			Requisicao requisicao1 = new Requisicao(RequisicaoTipo.APROVEITAMENTO,
					RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					null, null, 0.00,
					"Corte e costura", 8.00, 80,
					aluno1, edital, disciplina1);
			Requisicao requisicao2 = new Requisicao(RequisicaoTipo.CERTIFICACAO,
					RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					"Programacao II", new Date(), 0.00,
					"Funilaria", 0.00, 0,
					aluno1, edital, disciplina2);

			Requisicao requisicao3 = new Requisicao(RequisicaoTipo.APROVEITAMENTO,
					RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					null, null, 0.00,
					"Jardinagem", 9.00, 80,
					aluno2, edital, disciplina3);

			Requisicao requisicao4 = new Requisicao(RequisicaoTipo.CERTIFICACAO,
					RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					"Portugues", new Date(), 0.00,
					"Música", 0.00, 0,
					aluno2, edital, disciplina4);
			try {
				requisicaoRepository.save(requisicao1);
				requisicaoRepository.save(requisicao2);
				requisicaoRepository.save(requisicao3);
				requisicaoRepository.save(requisicao4);
				edital.getRequisicoes().add(requisicao1);
				edital.getRequisicoes().add(requisicao2);
				edital.getRequisicoes().add(requisicao3);
				edital.getRequisicoes().add(requisicao4);

			} catch (Exception e) {
				// TODO: handle exception
			}

			editalRepository.save(edital);

		};
	}
}
