package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

}
