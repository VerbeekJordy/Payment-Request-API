package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userRepository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    public void delete(long id) {
        userRepository.deleteById(id);
    }

    public User findOne(String username) {
        return userRepository.findByEmail(username);
    }

    public User findById(long id) {
        return userRepository.findById(id).get();
    }
}