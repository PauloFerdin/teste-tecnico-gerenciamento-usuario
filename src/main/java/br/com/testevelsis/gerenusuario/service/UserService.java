package br.com.testevelsis.gerenusuario.service;

import br.com.testevelsis.gerenusuario.model.User;
import br.com.testevelsis.gerenusuario.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Método para criar os usuários.
    public User createUser(User user) {
        // Validações de backend podem ser adicionadas aqui
        // Ex: if(userRepository.findByDocument(user.getDocument()).isPresent()) { throw new Exception("Documento já existe"); }
        return userRepository.save(user);
    }

    // Método para buscar o usuário por ID.
    public User getUserById(Long id) {
        // .findById(id) retorna um Optional, usamos .orElseThrow para lançar um erro se não encontrar
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + id));
    }

    // Método para atualizar um usuário
    public User updateUser(Long id, User userDetails) {
        // Primeiro, busca o usuário existente no banco
        User user = getUserById(id);

        // Atualiza os campos do usuário encontrado com os novos dados
        user.setName(userDetails.getName());
        user.setBirthDate(userDetails.getBirthDate());
        user.setDocument(userDetails.getDocument());
        user.setAddressStreet(userDetails.getAddressStreet());
        user.setAddressNumber(userDetails.getAddressNumber());
        user.setCity(userDetails.getCity());
        user.setState(userDetails.getState());
        user.setZipCode(userDetails.getZipCode());

        // Salva o usuário atualizado no banco de dados
        return userRepository.save(user);
    }


    public void deleteUser(Long id) {
        User user = getUserById(id); // Reutiliza o método para verificar se o usuário existe
        userRepository.delete(user);
    }


    public User save(User user) {
        return userRepository.save(user);
    }

    public User update(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o id: " + id));

        existingUser.setName(userDetails.getName());
        existingUser.setBirthDate(userDetails.getBirthDate());
        existingUser.setDocument(userDetails.getDocument());
        existingUser.setAddressStreet(userDetails.getAddressStreet());
        existingUser.setAddressNumber(userDetails.getAddressNumber());
        existingUser.setCity(userDetails.getCity());
        existingUser.setState(userDetails.getState());
        existingUser.setZipCode(userDetails.getZipCode());

        return userRepository.save(existingUser);
    }
}