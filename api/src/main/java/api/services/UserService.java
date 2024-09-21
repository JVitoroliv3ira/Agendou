package api.services;

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
}
