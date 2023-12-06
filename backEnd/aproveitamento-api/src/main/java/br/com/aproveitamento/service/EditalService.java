package br.com.aproveitamento.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.com.aproveitamento.model.Edital;
import br.com.aproveitamento.model.Etapa;
import br.com.aproveitamento.repository.EditalRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class EditalService {

    private EditalRepository editalRepository;

    public EditalService(EditalRepository editalRepository) {
        this.editalRepository = editalRepository;
    }

    public List<Edital> list() {
        return editalRepository.findAll();
    }

    public Edital findById(@jakarta.validation.constraints.NotNull @Positive Long id) {
        Optional<Edital> edital = editalRepository.findById(id);
        if (!edital.isPresent()) {
            return null;
        }
        return edital.get();
    }

    public void delete(@NotNull @Positive Long id) {
        editalRepository.deleteById(id);
    }

    public Edital updateOrCreate(@Valid @NotNull Edital edital) {

        if (edital.getDataInicio() == null || edital.getDataFim() == null) {
            throw new IllegalArgumentException("As datas de início e fim do edital são obrigatórias.");
        }

        if (edital.getDataInicio().after(edital.getDataFim())) {
            throw new IllegalArgumentException("A data de início não pode ser posterior à data de fim do edital.");
        }

        // Definindo o horário para 13:00 nas datas de início e fim
        setHorario13(edital.getDataInicio());
        setHorario13(edital.getDataFim());

        Edital e = new Edital();

        if (edital.getId() != null) {
            e.setId(edital.getId());
        }
        e.setNumero(edital.getNumero());
        e.setDataInicio(edital.getDataInicio());
        e.setDataFim(edital.getDataFim());

        List<Etapa> etapas = edital.getEtapas().stream().map(editalEtapas -> {
            var etapa = new Etapa();
            if (editalEtapas.getId() != null) {
                etapa.setId(editalEtapas.getId());
            }
            etapa.setNome(editalEtapas.getNome());
            etapa.setDataInicio(editalEtapas.getDataInicio());
            etapa.setDataFim(editalEtapas.getDataFim());
            etapa.setAtor(editalEtapas.getAtor());
            etapa.setEdital(e);
            return etapa;
        }).collect(Collectors.toList());

        e.setEtapas(etapas);
        editalRepository.save(e);
        return e;
    }

    // Método para definir o horário para 13:00 em uma data
    private void setHorario13(java.util.Date data) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        try {
            String dateString = dateFormat.format(data);
            String horario13 = "13:00";
            String dateTimeString = dateString + " " + horario13;
            data.setTime(dateFormat.parse(dateTimeString).getTime());
        } catch (Exception e) {
            throw new IllegalArgumentException("Erro ao definir o horário para 13:00 na data.");
        }
    }
}
