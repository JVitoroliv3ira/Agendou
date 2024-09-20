package api.settings;

import api.domain.dtos.responses.ApiResponse;
import api.exceptions.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<?>> handleApiException(ApiException ex) {
        log.error(ex.getMessage());
        Map<String, List<String>> errors = new HashMap<>();
        errors.put(ex.getField(), List.of(ex.getMessage()));

        return ResponseEntity
                .status(ex.getStatus())
                .body(new ApiResponse<>(errors));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error(ex.getMessage());
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        Map<String, List<String>> validationErrors = fieldErrors.stream()
                .collect(Collectors.groupingBy(
                        FieldError::getField,
                        Collectors.mapping(FieldError::getDefaultMessage, Collectors.toList())
                ));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(validationErrors));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFoundException(NoHandlerFoundException ex) {
        log.error(ex.getMessage());
        Map<String, List<String>> errors = new HashMap<>();
        errors.put("server", List.of("O recurso solicitado não foi encontrado."));

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGlobalException(Exception ex) {
        log.error(ex.getMessage());
        Map<String, List<String>> errors = new HashMap<>();
        errors.put("server", List.of("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."));

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(errors));
    }

}
