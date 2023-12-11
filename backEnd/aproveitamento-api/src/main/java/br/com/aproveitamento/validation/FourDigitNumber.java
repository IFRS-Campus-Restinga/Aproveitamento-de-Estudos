package br.com.aproveitamento.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = FourDigitNumberValidator.class)
@Documented
public @interface FourDigitNumber {
    String message() default "O ano deve conter exatamente 4 dígitos";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
