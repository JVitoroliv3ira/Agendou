package api.domain.dtos.responses;

import java.util.List;
import java.util.Map;

public record ApiResponse<T>(
        T content,
        Map<String, List<String>> errors
) {
    public ApiResponse(T content) {
        this(content, null);
    }

    public ApiResponse(Map<String, List<String>> errors) {
        this(null, errors);
    }
}
