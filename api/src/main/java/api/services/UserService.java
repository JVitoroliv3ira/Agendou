package api.services;

import api.domain.dtos.Details;
import api.domain.models.User;
import api.exceptions.ApiException;
import api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private static final String EMAIL_NOT_UNIQUE_ERROR = "Este e-mail já está associado a uma conta existente.";
    private static final String USER_NOT_FOUND_ERROR = "Usuário não encontrado na base de dados.";

    public User create(User user) {
        user.setId(null);
        return this.userRepository.save(user);
    }

    public void validateEmailUniqueness(String email) {
        if (this.userRepository.existsByEmailIgnoreCase(email)) {
            throw new ApiException(
                    EMAIL_NOT_UNIQUE_ERROR,
                    "email",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    public Details loadUserById(Long id) throws ApiException {
        User user = this.userRepository
                .findById(id)
                .orElseThrow(() -> new ApiException(
                        USER_NOT_FOUND_ERROR,
                        "id",
                        HttpStatus.BAD_REQUEST
                ));

        return new Details(user);
    }
}
