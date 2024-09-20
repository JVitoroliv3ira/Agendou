package api.services;

import api.domain.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public void register(User user) {
        this.userService.validateEmailUniqueness(user.getEmail());
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.userService.create(user);
    }
}
