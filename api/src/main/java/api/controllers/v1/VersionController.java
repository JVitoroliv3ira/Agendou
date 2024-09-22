package api.controllers.v1;

import api.domain.dtos.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(path = "/api/v1/version")
@RestController
public class VersionController {
    @GetMapping
    public ResponseEntity<ApiResponse<String>> version() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>("Em desenvolvimento"));
    }
}
