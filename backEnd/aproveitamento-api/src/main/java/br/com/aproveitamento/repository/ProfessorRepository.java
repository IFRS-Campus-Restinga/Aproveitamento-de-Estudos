package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

}
