package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.dto.ResetPassword;
import elision.paymentrequestapi.paymentrequestapi.dto.UserDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.UserMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Role;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final RoleService roleService;

    private final BCryptPasswordEncoder bcryptEncoder;

    private final EmailGoogleService emailGoogleService;

    public UserService(UserRepository userRepository, RoleService roleService, BCryptPasswordEncoder bcryptEncoder, EmailGoogleService emailGoogleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.bcryptEncoder = bcryptEncoder;
        this.emailGoogleService = emailGoogleService;
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
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()));
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

    public User save(UserDto userDto) {
        User user = UserMapper.INSTANCE.UserDtoToUser(userDto);
        Role role = roleService.findRoleByName("USER");
        user.setRole(role);
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void createToken(String email) {
        User user = userRepository.findByEmail(email);
        user.setToken(UUID.randomUUID().toString());
        userRepository.save(user);
        emailGoogleService.sendSimpleMessage(email, "Reset password", "Dear customer,\nClick on the following link to reset your personal password: http://localhost:4200/reset/" + user.getToken());
    }

    public Optional<User> resetPassword(ResetPassword resetPassword) {
        User user = userRepository.getUserByRegistrationToken(resetPassword.getToken());
        user.setPassword(bcryptEncoder.encode(resetPassword.getPassword()));
        user.setToken(null);
        return Optional.ofNullable(userRepository.save(user));
    }
}