package br.com.aproveitamento.validation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class AnoMenorOuIgualValidator implements ConstraintValidator<AnoMenorOuIgualAtual, Integer> {

    @Override
    public boolean isValid(Integer ano, ConstraintValidatorContext context) {
        int anoAtual = LocalDate.now().getYear();
        return ano <= anoAtual;
    }
}