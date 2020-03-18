package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Product;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.repository.OrderRepository;
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
@SpringBootTest(classes = OrderService.class)
public class OrderServiceUnitTest {

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private StringToProductConverter stringToProductConverter;

    @MockBean
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Test
    public void addOrderToUser() {
        User user = new User();
        List<Product> products = new ArrayList<>();
        Order order = new Order(products);
        OrderDto orderDto = new OrderDto();
        given(userRepository.findByEmail(anyString())).willReturn(user);
        given(orderRepository.save(any())).willReturn(order);
        Assertions.assertTrue(orderService.addingOrder("", orderDto).isPresent());
    }
}
