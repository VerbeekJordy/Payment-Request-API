package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.OrderToOrderOutgoingDtoConverter;
import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderInComingDto;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.PaymentMapper;
import elision.paymentrequestapi.paymentrequestapi.mapper.PaymentMapperImpl;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Payment;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = OrderService.class)
public class OrderServiceUnitTest {

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private EmailGoogleService emailGoogleService;
    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private StringToProductConverter stringToProductConverter;

    @MockBean
    private OrderToOrderOutgoingDtoConverter orderToOrderOutgoingDtoConverter;

    @MockBean
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

//    @Test
//    public void addOrderToUser() {
//        User user = new User();
//        List<Product> products = new ArrayList<>();
//        Order order = new Order(products);
//        OrderInComingDto orderInComingDto = new OrderInComingDto();
//        given(PaymentMapper.INSTANCE.paymentDtoToPayment(any())).willReturn(new Payment());
//        given(userRepository.findByEmail(anyString())).willReturn(user);
//        given(orderRepository.save(any())).willReturn(order);
//        given(paymentMapper.paymentDtoToPayment(any())).willReturn(new Payment());
//        Assertions.assertTrue(orderService.addingOrder("", orderInComingDto).isPresent());
//    }

    @Test
    public void gettingOrders() {
        User user = new User();
        given(userRepository.findByEmail(anyString())).willReturn(user);
        Assertions.assertTrue(orderService.gettingOrders("").isPresent());
    }

    @Test
    public void gettingOrder() {
        User user = new User();
        List<Order> orders = new ArrayList<>();
        orders.add(new Order());
        user.setOrders(orders);
        given(userRepository.findByEmail(any())).willReturn(user);
        given(orderRepository.findById(any())).willReturn(Optional.of(user.getOrders().get(0)));
        given(orderToOrderOutgoingDtoConverter.orderToOrderOutgoingDto(any())).willReturn(new OrderOutGoingDto());
        Assertions.assertTrue(orderService.gettingOrder((long) 1).isPresent());
    }
}
