package api.controllers.v1;

import api.domain.dtos.requests.RefreshTokenRequest;
import api.domain.dtos.requests.UserAuthenticationRequest;
import api.domain.dtos.requests.UserRegistrationRequest;
import api.domain.dtos.responses.ApiResponse;
import api.domain.dtos.responses.AuthenticatedUserResponse;
import api.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/auth")
@RestController
public class AuthController {
    private final AuthService authService;

    @PostMapping(path = "/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody UserRegistrationRequest request) {
        this.authService.register(request.convert());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Usuário cadastrado com sucesso!"));
    }

    @PostMapping(path = "/token")
    public ResponseEntity<ApiResponse<AuthenticatedUserResponse>> token(@Valid @RequestBody UserAuthenticationRequest request) {
        AuthenticatedUserResponse result = this.authService.token(request.convert());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(result, null));
    }

    @PostMapping(path = "/token/refresh")
    public ResponseEntity<ApiResponse<String>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String accessToken = this.authService.refreshAccessToken(request.refreshToken());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(accessToken));
    }
}
