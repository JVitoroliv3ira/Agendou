package api.providers;

import api.domain.dtos.Details;
import api.exceptions.ApiException;
import api.services.DetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class DefaultAuthProvider implements AuthenticationProvider {
    private final DetailsService detailsService;
    private final PasswordEncoder passwordEncoder;
    private static final String WRONG_CREDENTIALS_ERROR = "A credencial informada é inválida.";

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        Details details = this.detailsService.loadUserByUsername(email);

        this.validatePassword(password, details.getPassword());

        return new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!this.passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new ApiException(
                    WRONG_CREDENTIALS_ERROR,
                    "password",
                    HttpStatus.BAD_REQUEST
            );
        }
    }
}
