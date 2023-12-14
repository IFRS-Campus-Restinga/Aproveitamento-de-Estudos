package br.com.aproveitamento.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AnoMenorOuIgualValidator.class)
public @interface AnoMenorOuIgualAtual {

    String message() default "O ano não pode ser maior que o atual";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
