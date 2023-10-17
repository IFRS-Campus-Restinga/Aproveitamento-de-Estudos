package br.com.aproveitamento.repository;

/*Está em construção
Guilherme Selau Pereira*/

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Disciplina;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {

}
