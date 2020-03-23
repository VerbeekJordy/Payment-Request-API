package elision.paymentrequestapi.paymentrequestapi.repository;

import elision.paymentrequestapi.paymentrequestapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);

    @Query("select user from User as user where user.token =?1")
    User getUserByRegistrationToken(String token);
}
