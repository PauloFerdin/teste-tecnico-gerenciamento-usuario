package br.com.testevelsis.gerenusuario.controller;

import br.com.testevelsis.gerenusuario.model.User;
import br.com.testevelsis.gerenusuario.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Deixo isso para que permita que o front-end acesse a API
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint que LISTA o Usuário.

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint que CRIA o usuário.

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userService.createUser(user);
    }

    // Endpoint para BUSCAR um usuário por ID.

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        // @PathVariable extrai o {id} da URL
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Endpoint para ATUALIZAR um usuário.

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para DELETAR um usuário.

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Retorna um status 204 (No Content), que é o padrão para delete com sucesso
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}