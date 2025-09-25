package br.com.testevelsis.gerenusuario.model;

import jakarta.persistence.*;
import lombok.Data; // Importação do Lombok
import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;
import java.time.LocalDate;

@Entity
@Table(name = "users") // Nome da tabela
@Data // Uso o LOMBOK para criar os getters e setters automaticamente.
public class User {

    @Id // Campo da chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 5. Configura a chave primária para ser autoincrementada pelo banco
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    @Column(nullable = false) // Campo não pode ser nulo
    private String name;

    @Past(message = "A data de nascimento deve ser no passado")
    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @NotBlank(message = "O documento não pode estar em branco")
    @Column(nullable = false, unique = true) // Documento não pode ser nulo e deve ser único
    private String document;

    @Column(name = "address_street")
    private String addressStreet;

    @Column(name = "address_number")
    private String addressNumber;

    private String city;

    private String state;

    @Column(name = "zip_code")
    private String zipCode;

   // Campos de auditoria
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}