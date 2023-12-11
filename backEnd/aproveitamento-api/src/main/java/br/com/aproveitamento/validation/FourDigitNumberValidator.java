package br.com.aproveitamento.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FourDigitNumberValidator implements ConstraintValidator<FourDigitNumber, Integer> {

    @Override
    public void initialize(FourDigitNumber constraintAnnotation) {
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value != null && value >= 1000 && value <= 9999;
    }
}

