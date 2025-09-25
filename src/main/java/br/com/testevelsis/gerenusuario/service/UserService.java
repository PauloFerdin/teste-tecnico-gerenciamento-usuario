package br.com.testevelsis.gerenusuario.service;

import br.com.testevelsis.gerenusuario.model.User;
import br.com.testevelsis.gerenusuario.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Validações de backend podem ser adicionadas aqui
        // Ex: if(userRepository.findByDocument(user.getDocument()).isPresent()) { throw new Exception("Documento já existe"); }
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + id));

        user.setName(userDetails.getName());
        user.setBirthDate(userDetails.getBirthDate());
        user.setDocument(userDetails.getDocument());
        user.setAddressStreet(userDetails.getAddressStreet());
        user.setAddressNumber(userDetails.getAddressNumber());
        user.setCity(userDetails.getCity());
        user.setState(userDetails.getState());
        user.setZipCode(userDetails.getZipCode());

        return userRepository.save(user);
    }
}