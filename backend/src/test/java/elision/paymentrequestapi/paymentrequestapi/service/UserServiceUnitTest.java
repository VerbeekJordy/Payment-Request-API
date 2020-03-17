package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = UserService.class)
public class UserServiceUnitTest {
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleService roleService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private StringToProductConverter stringToProductConverter;

    @Autowired
    private UserService userService;

    @Test
    public void addOrderToUser() {
        User user = new User();
        List<Order> orders = new ArrayList<>();
        orders.add(new Order());
        User userAddedOrder = new User(orders);
        OrderDto orderDto = new OrderDto();
        given(userRepository.findByEmail(anyString())).willReturn(user);
        given(userRepository.save(any())).willReturn(userAddedOrder);
        Assertions.assertEquals(userService.addOrderToUser("", orderDto).get().getOrders().size(), 1);
    }
}
