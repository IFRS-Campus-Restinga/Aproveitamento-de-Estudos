package br.com.aproveitamento.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.aproveitamento.dto.RequisicaoDTO;
import br.com.aproveitamento.model.Anexo;
import br.com.aproveitamento.service.RequisicaoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/requisicao")
public class RequisicaoController {

	private static final String UPLOAD_DIR = "C:/arquivos";

	@Autowired
	private RequisicaoService requisicaoService;
	
	@GetMapping
	public @ResponseBody List<RequisicaoDTO> list(){
		return requisicaoService.list();
	}
	
	@GetMapping("/{id}")
	public RequisicaoDTO findById(@PathVariable @NotNull @Positive Long id) {
		return requisicaoService.findById(id);
	}
		
	@PutMapping
	public RequisicaoDTO update(@RequestBody @Valid RequisicaoDTO requisicaoDTO){
		return requisicaoService.createOrUpdate(requisicaoDTO);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable @NotNull @Positive Long id){
		requisicaoService.delete(id);
    }

	@PostMapping
	public ResponseEntity<RequisicaoDTO> handleFileUpload(
            @RequestParam("id") String id,
			@RequestParam("tipoSolicitacao") String tipoSolicitacao,
			@RequestParam("status") String status,
			@RequestParam("dataCriacao") String dataCriacao,
			@RequestParam("experienciasAnteriores") String experienciasAnteriores,
			@RequestParam("dataAgendamentoProva") String dataAgendamentoProva,
			@RequestParam("notaDaProva") String notaDaProva,
			@RequestParam("diciplinaCursaAnteriormente") String diciplinaCursaAnteriormente,
			@RequestParam("notaObtida") String notaObtida,
			@RequestParam("cargaHoraria") String cargaHoraria,
			@RequestParam("edital_id") String edital_id,
			@RequestParam("aluno_id") String aluno_id,
			@RequestParam("disciplina_id") String disciplina_id,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {

        try {
			RequisicaoDTO requisicaoDTO = requisicaoService.adapterDto(id, tipoSolicitacao, status, dataCriacao, 
																	   experienciasAnteriores, dataAgendamentoProva, 
																	   notaDaProva, diciplinaCursaAnteriormente, notaObtida, 
																	   cargaHoraria, aluno_id, edital_id, disciplina_id); 
			if(files != null && !files.isEmpty()){
				String uuid = UUID.randomUUID().toString();
				for (MultipartFile file : files) {
					String path = UPLOAD_DIR + "/" + uuid;
            	    Path filePath = Path.of(path, file.getOriginalFilename());
					Files.createDirectories(filePath);
            	    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
					requisicaoDTO.anexos().add(new Anexo(file.getName(), file.getOriginalFilename(), path, null));
            	}
			}
            return ResponseEntity.status(HttpStatus.CREATED).body(requisicaoService.createOrUpdate(requisicaoDTO));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
    }
}
