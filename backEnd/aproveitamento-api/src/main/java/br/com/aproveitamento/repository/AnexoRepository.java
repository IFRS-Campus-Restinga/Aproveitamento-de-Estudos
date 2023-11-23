package br.com.aproveitamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.aproveitamento.model.Anexo;

@Repository
public interface AnexoRepository extends JpaRepository<Anexo, Long> {

}
