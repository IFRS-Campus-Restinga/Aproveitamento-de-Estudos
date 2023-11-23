package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Servidor;

@Repository
public interface ServidorRepository extends JpaRepository<Servidor, Long> {

}
