package br.com.testevelsis.gerenusuario.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;

@Entity
@Table(name = "users") // Nome da tabela
@Data // Uso o LOMBOK para criar os getters e setters automaticamente.
public class User {

    @Id // Campo da chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura a chave primária para ser autoincrementada pelo banco
    private Long id;

    @NotBlank(message = "O nome é obrigatório.")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
    private String name;

    @NotNull(message = "A data de nascimento é obrigatória.")
    @Past(message = "A data de nascimento deve ser no passado.")
    private LocalDate birthDate;

    @NotBlank(message = "O documento é obrigatório.")
    // Validação do tamanho do CPF.
    @Size(min = 11, max = 14, message = "O documento deve ter um formato válido.")
    private String document;

    @NotBlank(message = "A rua é obrigatória.")
    private String addressStreet;

    @NotBlank(message = "O número é obrigatório.")
    private String addressNumber;

    @NotBlank(message = "A cidade é obrigatória.")
    private String city;

    @NotBlank(message = "O estado é obrigatório.")
    @Size(min = 2, max = 2, message = "O estado deve ser uma sigla de 2 caracteres.")
    private String state;

    @NotBlank(message = "O CEP é obrigatório.")
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