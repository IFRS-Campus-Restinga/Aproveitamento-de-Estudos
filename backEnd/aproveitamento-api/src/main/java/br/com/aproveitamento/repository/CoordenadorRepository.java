package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Coordenador;

@Repository
public interface CoordenadorRepository extends JpaRepository<Coordenador, Long> {

}
