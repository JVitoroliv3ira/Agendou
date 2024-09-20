package api.domain.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "public", name = "tb_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_users")
    @SequenceGenerator(
            name = "sq_users",
            schema = "public",
            sequenceName = "sq_users",
            allocationSize = 1
    )
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
}