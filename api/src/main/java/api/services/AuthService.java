package api.services;

import api.domain.dtos.Details;
import api.domain.dtos.responses.AuthenticatedUserResponse;
import api.domain.models.User;
import api.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private static final String TOKEN_REQUIRED_MESSAGE = "O token de atualização é obrigatório.";
    private static final String INVALID_OR_EXPIRED_TOKEN_MESSAGE = "Token de atualização inválido ou expirado.";
    private static final String USER_NOT_FOUND_MESSAGE = "Usuário não encontrado na base de dados.";
    private static final String AUTHORIZATION = "authorization";

    public void register(User user) {
        this.userService.validateEmailUniqueness(user.getEmail());
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.userService.create(user);
    }

    public AuthenticatedUserResponse token(Authentication authentication) {
        Authentication result = this.authenticationManager.authenticate(authentication);
        Details details = (Details) result.getPrincipal();
        String token = this.jwtService.generateToken(details.getId());
        String refreshToken = this.jwtService.generateRefreshToken(details.getId());
        return new AuthenticatedUserResponse(
                details,
                token,
                refreshToken
        );
    }

    public String refreshAccessToken(String refreshToken) {
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            throw new ApiException(TOKEN_REQUIRED_MESSAGE, AUTHORIZATION, HttpStatus.BAD_REQUEST);
        }

        if (!jwtService.validateToken(refreshToken)) {
            throw new ApiException(INVALID_OR_EXPIRED_TOKEN_MESSAGE, AUTHORIZATION, HttpStatus.UNAUTHORIZED);
        }

        Long id = jwtService.getUserIdFromToken(refreshToken);
        if (id == null) {
            throw new ApiException(USER_NOT_FOUND_MESSAGE, AUTHORIZATION, HttpStatus.UNAUTHORIZED);
        }

        return jwtService.generateToken(id);
    }
}
