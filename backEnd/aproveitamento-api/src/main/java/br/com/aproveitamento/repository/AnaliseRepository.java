package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Analise;

@Repository
public interface AnaliseRepository extends JpaRepository<Analise, Long>{

}
