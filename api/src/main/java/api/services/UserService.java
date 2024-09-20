package api.services;

import api.domain.models.User;
import api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User create(User user) {
        user.setId(null);
        return this.userRepository.save(user);
    }
}
