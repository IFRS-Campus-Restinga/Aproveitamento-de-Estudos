package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.PPC;

@Repository
public interface PPCRepository extends JpaRepository<PPC, Long>{

}
