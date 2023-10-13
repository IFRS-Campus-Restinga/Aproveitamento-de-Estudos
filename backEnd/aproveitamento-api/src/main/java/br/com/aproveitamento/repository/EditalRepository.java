package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Edital;

@Repository
public interface EditalRepository extends JpaRepository<Edital, Long> {

}
