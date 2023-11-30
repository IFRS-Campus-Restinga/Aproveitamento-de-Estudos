package br.com.aproveitamento.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;

import br.com.aproveitamento.dto.CoordenadorDTO;
import br.com.aproveitamento.dto.CursoCreateDTO;
import br.com.aproveitamento.dto.CursoDTO;
import br.com.aproveitamento.model.Coordenador;
import br.com.aproveitamento.model.Curso;
import br.com.aproveitamento.model.Disciplina;
import br.com.aproveitamento.model.PPC;
import br.com.aproveitamento.repository.CoordenadorRepository;
import br.com.aproveitamento.repository.CursoRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CursoService {

    private CursoRepository cursoRepository;
    private CoordenadorRepository coordenadorRepository;

    public CursoService(CursoRepository cursoRepository, CoordenadorRepository coordenadorRepository) {
        super();
        this.cursoRepository = cursoRepository;
        this.coordenadorRepository = coordenadorRepository;
    }

    public List<Curso> list() {
        return cursoRepository.findAll();
    }

    public CursoDTO findById(@NotNull @Positive Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        if (!curso.isPresent())
            return null;
        return new CursoDTO(curso.get().getId(), curso.get().getNome(),
                this.getCoordenador(curso.get().getCoordenadores()),
                this.carregaCoordenador(curso.get().getCoordenadores()));
    }

    public List<CoordenadorDTO> carregaCoordenador(List<Coordenador> coordenadores) {
        ArrayList<CoordenadorDTO> coordenadoresDTO = new ArrayList<CoordenadorDTO>();
        for (Coordenador coordenador : coordenadores) {

            CoordenadorDTO coordenadorDTO = new CoordenadorDTO(coordenador.getId(), coordenador.getNome(),
                    coordenador.getEmail(), false, true, coordenador.getTipo(), coordenador.getSiape(),
                    coordenador.getCurso());
            coordenadoresDTO.add(coordenadorDTO);

        }
        return coordenadoresDTO;
    }

    public Curso create(@Valid @NotNull Curso curso) {
        return cursoRepository.save(curso);
    }

    public Curso update(@Valid Curso curso) {
        return cursoRepository.save(curso);
    }

    public void delete(@NotNull @Positive Long id) {
        cursoRepository.deleteById(id);
    }

    public Long getCoordenador(List<Coordenador> coordenadores) {

        for (Coordenador c : coordenadores) {
            if (c.getAtivo() == true) {
                return c.getId();
            }
        }
        return Long.parseLong("0");
    }

    public Curso createOrUpdate(@Valid @NotNull CursoCreateDTO cursoDto) {
        Curso curso = new Curso();
        if (cursoDto.id() != null) {
            curso.setId(cursoDto.id());
        }
        curso.setNome(cursoDto.nome());

        if(cursoDto.coordenadores() != null){
            for(CoordenadorDTO coordenadorDTO : cursoDto.coordenadores()){
                Optional<Coordenador> coordenador = coordenadorRepository.findById(coordenadorDTO.id());
                if (coordenador.isPresent()){
                    if(coordenadorDTO.id() == cursoDto.coordenador_id()){
                        coordenador.get().setAtivo(true);
                    }else{
                        coordenador.get().setAtivo(false);
                    }
                }
            }
        }
        
        cursoRepository.save(curso);
        return curso;
    }

}