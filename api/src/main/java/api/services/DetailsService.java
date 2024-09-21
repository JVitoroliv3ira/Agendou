package api.services;

import api.domain.dtos.Details;
import api.domain.models.User;
import api.exceptions.ApiException;
import api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    private static final String USER_NOT_FOUND_ERROR = "Usuário não encontrado na base de dados.";

    @Override
    public Details loadUserByUsername(String email) throws ApiException {
        User user = this.userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ApiException(
                        USER_NOT_FOUND_ERROR,
                        "email",
                        HttpStatus.BAD_REQUEST
                ));

        return new Details(user);
    }
}
