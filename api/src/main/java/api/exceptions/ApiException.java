package api.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiException extends RuntimeException {
    private HttpStatus status;
    private String field;

    public ApiException(String message, String field, HttpStatus status) {
        super(message);
        this.status = status;
        this.field = field;
    }
}