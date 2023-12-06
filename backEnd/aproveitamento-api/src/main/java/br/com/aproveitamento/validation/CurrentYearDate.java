package br.com.aproveitamento.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;
import java.util.Date;
import java.time.ZoneId;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CurrentYearDateValidator.class)
@Documented
public @interface CurrentYearDate {

    String message() default "A data de agendamento deve ser do ano corrente";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

class CurrentYearDateValidator implements ConstraintValidator<CurrentYearDate, Date> {

    @Override
    public void initialize(CurrentYearDate constraintAnnotation) {
        // Nenhuma inicialização necessária
    }

    @Override
    public boolean isValid(Date date, ConstraintValidatorContext context) {
        if (date == null) {
            return true; // Deixe outras validações lidarem com valores nulos se necessário
        }

        int currentYear = LocalDate.now().getYear();
        int yearOfDate = LocalDate.ofInstant(date.toInstant(), ZoneId.systemDefault()).getYear();

        return currentYear == yearOfDate;
    }
    
}
