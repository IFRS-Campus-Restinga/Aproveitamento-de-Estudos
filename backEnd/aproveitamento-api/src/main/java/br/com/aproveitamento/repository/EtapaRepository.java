package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Etapa;

@Repository
public interface EtapaRepository extends JpaRepository<Etapa, Long>{

}
