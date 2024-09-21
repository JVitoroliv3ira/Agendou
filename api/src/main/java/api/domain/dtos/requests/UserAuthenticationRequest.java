package api.domain.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

public record UserAuthenticationRequest(
        @NotNull(message = "O e-mail é obrigatório")
        @Size(min = 5, max = 100, message = "O e-mail deve ter entre {min} e {max} caracteres")
        @Email(message = "O e-mail deve ser válido")
        String email,

        @NotNull(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter pelo menos {min} caracteres")
        String password
) {

    public Authentication convert() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
