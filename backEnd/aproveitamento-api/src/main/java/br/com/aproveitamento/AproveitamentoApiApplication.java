package br.com.aproveitamento;

import java.util.*;

import br.com.aproveitamento.model.*;
import br.com.aproveitamento.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.aproveitamento.enums.RequisicaoStatus;
import br.com.aproveitamento.enums.RequisicaoTipo;
import br.com.aproveitamento.enums.UsuarioTipo;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AproveitamentoApiApplication implements CommandLineRunner{

//	rodar somente na hora da criação da base
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	ClientRepository clientRepository;


	@Autowired
	PasswordEncoder passEncoder;

	public static void main(String[] args) {
		SpringApplication.run(AproveitamentoApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
// 		rodar somente na hora de criação da base de dados
		Role adminRole = Role.builder().role(UsuarioTipo.SERVIDOR).build();
		Role userRole = Role.builder().role(UsuarioTipo.ALUNO).build();
		Role coordenatorRole = Role.builder().role(UsuarioTipo.COORDENADOR).build();
		Role professorRole = Role.builder().role(UsuarioTipo.PROFESSOR).build();
		roleRepository.save(adminRole);
		roleRepository.save(coordenatorRole);
		roleRepository.save(professorRole);
		roleRepository.save(userRole);

		Set<String> authenticationsMethods = new HashSet<>();
		authenticationsMethods.add("client_secret_basic");

		Set<String> authenticationsGrantTypes = new HashSet<>();
		authenticationsGrantTypes.add("authorization_code");
		authenticationsGrantTypes.add("refresh_token");
		authenticationsGrantTypes.add("client_credentials");



		// alterar esse valor a mão no banco apos o inicio do back-end
		// alterar para o endereço do front
		// para debug, utilizando o: https://oauthdebugger.com/
//		Set<String> redirectUris = new HashSet<>();
//		redirectUris.add("https://oauthdebugger.com/debug");

		Set<String> redirectUris = new HashSet<>();
		redirectUris.add("http://127.0.0.1:4200/authorized");


		Set<String> scopes = new HashSet<>();
		scopes.add("openid");
		scopes.add("profile");

		Client cliente = new Client("client", passEncoder.encode("secret"), "client", authenticationsMethods, authenticationsGrantTypes, redirectUris, scopes, true);

		clientRepository.save(cliente);
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
		    UsuarioRepository usuarioRepository,
			AnexoRepository anexoRepository,
			AnaliseRepository analiseRepository) {

		return args -> {

			Curso curso1 = new Curso("ADS");
			Curso curso2 = new Curso("Letras");

			PPC ppc1 = new PPC("PPC ADS", 2023, curso1);
			PPC ppc2 = new PPC("PPC Letras", 2023, curso2);

			curso1.getPPCs().add(ppc1);
			curso2.getPPCs().add(ppc2);

			Disciplina disciplina1 = new Disciplina("Prog I", 88, ppc1, "123");
			Disciplina disciplina2 = new Disciplina("Prog II", 88, ppc1, "124");
			Disciplina disciplina3 = new Disciplina("Literatura", 65, ppc2, "125");
			Disciplina disciplina4 = new Disciplina("Portugues", 65, ppc2, "126");

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
			Aluno aluno2 = new Aluno("igor", "igor@teste.com", false, UsuarioTipo.ALUNO, "654123", "01/23", curso2);

			alunoRepository.save(aluno1);
			alunoRepository.save(aluno2);

			curso1.getAlunos().add(aluno1);
			curso2.getAlunos().add(aluno2);

			Coordenador coordenador1 = new Coordenador("Yuri", "yuri@teste.com", true, UsuarioTipo.COORDENADOR,
					"987456", new Date(), new Date(), curso1);
			Coordenador coordenador2 = new Coordenador("João", "joão@teste.com", true, UsuarioTipo.COORDENADOR,
					"369852", new Date(), new Date(), curso2);




			Usuario userCoordenacao1 = new Usuario(coordenador1.getNome(), coordenador1.getEmail(), true, coordenador1.getTipo(), "admin", passEncoder.encode("admin"), roleRepository.findByRole(UsuarioTipo.COORDENADOR));



			usuarioRepository.save(userCoordenacao1);

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

			Edital edital = new Edital("5001", new Date(), new Date());

			editalRepository.save(edital);

			Etapa etapa1 = new Etapa("Período de inscrições", new Date(), new Date(), UsuarioTipo.ALUNO, edital);
			Etapa etapa2 = new Etapa("Encaminhamento", new Date(), new Date(), UsuarioTipo.ENSINO, edital);
			Etapa etapa3 = new Etapa("Análise dos processos pelos docentes", new Date(), new Date(),
					UsuarioTipo.PROFESSOR, edital);
			Etapa etapa4 = new Etapa("Homologação dos coordenadores", new Date(), new Date(), UsuarioTipo.COORDENADOR,
					edital);
			Etapa etapa5 = new Etapa("Devolução dos processos à Coordenação", new Date(), new Date(),
					UsuarioTipo.COORDENADOR, edital);
			Etapa etapa6 = new Etapa("Processamento dos resultados pela Coordenação de Registros Escolares", new Date(),
					new Date(), UsuarioTipo.ENSINO, edital);

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

			Requisicao requisicao1 = new Requisicao(RequisicaoTipo.APROVEITAMENTO, RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					null, null, 0.00,
					2, 8.00, 80,
					aluno1, edital, disciplina1);
			Requisicao requisicao2 = new Requisicao(RequisicaoTipo.CERTIFICACAO, RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					"Prog II", new Date(), 0.00,
					0, 0.00, 0,
					aluno1, edital, disciplina2);

			Requisicao requisicao3 = new Requisicao(RequisicaoTipo.APROVEITAMENTO, RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
					null, null, 0.00,
					3, 9.00, 80,
					aluno2, edital, disciplina3);

			Requisicao requisicao4 = new Requisicao(RequisicaoTipo.CERTIFICACAO, RequisicaoStatus.SOLICITACAO_CRIADA,
					new Date(),
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
			 * Analise analise1 = new Analise();
			 * Analise analise2 = new Analise();
			 * Analise analise3 = new Analise();
			 * Analise analise4 = new Analise();
			 */

		};
	}
}
