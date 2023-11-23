package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Ensino;

@Repository
public interface EnsinoRepository extends JpaRepository<Ensino, Long>{

}
