package br.com.testevelsis.gerenusuario.repository;

import br.com.testevelsis.gerenusuario.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
