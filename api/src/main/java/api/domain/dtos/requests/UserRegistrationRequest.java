package api.domain.dtos.requests;

import api.domain.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegistrationRequest(
        @NotNull(message = "O nome é obrigatório.")
        @Size(min = 4, max = 30, message = "O nome deve ter entre {min} e {max} caracteres.")
        String name,

        @NotNull(message = "O e-mail é obrigatório.")
        @Size(min = 5, max = 100, message = "O e-mail deve ter entre {min} e {max} caracteres.")
        @Email(message = "O e-mail deve ser válido.")
        String email,

        @NotNull(message = "A senha é obrigatória.")
        @Size(min = 8, message = "A senha deve ter pelo menos {min} caracteres.")
        String password
) {

    public User convert() {
        return User
                .builder()
                .name(name())
                .email(email())
                .password(password())
                .build();
    }

}
