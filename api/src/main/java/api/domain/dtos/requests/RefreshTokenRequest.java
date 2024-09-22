package api.domain.dtos.requests;

import jakarta.validation.constraints.NotBlank;

public record RefreshTokenRequest(
        @NotBlank(message = "Informe o token de renovação.")
        String refreshToken
) {
}
