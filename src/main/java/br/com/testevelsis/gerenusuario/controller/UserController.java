package br.com.testevelsis.gerenusuario.controller;

import br.com.testevelsis.gerenusuario.model.User;
import br.com.testevelsis.gerenusuario.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Deixo isso para que permita que o front-end acesse a API
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint que LISTA todos os Usuário.

    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        Page<User> userPage = userService.findAll(pageable);
        return ResponseEntity.ok(userPage);
    }

    // Endpoint para BUSCAR um usuário por ID.

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // @PathVariable extrai o {id} da URL
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Endpoint que CRIA o usuário.

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        // Se a validação falhar, o Spring lançará uma exceção antes de entrar no método
        User savedUser = userService.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Endpoint para ATUALIZAR um usuário.

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        User updatedUser = userService.update(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    // Endpoint para DELETAR um usuário.

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Retorna um status 204 (No Content), que é o padrão para delete com sucesso
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}