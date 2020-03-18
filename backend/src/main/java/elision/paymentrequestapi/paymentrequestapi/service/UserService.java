package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.dto.UserDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.OrderMapper;
import elision.paymentrequestapi.paymentrequestapi.mapper.UserMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
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

    private final StringToProductConverter stringToProductConverter;

    public UserService(UserRepository userRepository, RoleService roleService, BCryptPasswordEncoder bcryptEncoder, StringToProductConverter stringToProductConverter) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.bcryptEncoder = bcryptEncoder;
        this.stringToProductConverter = stringToProductConverter;
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

//    public Optional<User> addOrderToUser(String email, OrderDto orderDto) {
//        User user = userRepository.findByEmail(email);
//        Order order = stringToProductConverter.stringToProduct(orderDto);
//        user.getOrders().add(order);
//        User saveUser = userRepository.save(user);
//        return Optional.ofNullable(saveUser);
//    }
}