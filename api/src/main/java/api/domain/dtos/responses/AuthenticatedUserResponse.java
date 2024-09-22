package api.domain.dtos.responses;

import api.domain.dtos.Details;

public record AuthenticatedUserResponse(String name, String email, String token, String refreshToken) {

    public AuthenticatedUserResponse(Details details, String token, String refreshToken) {
        this(details.getName(), details.getUsername(), token, refreshToken);
    }
}