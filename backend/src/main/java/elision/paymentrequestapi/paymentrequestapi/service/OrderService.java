package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.repository.OrderRepository;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final StringToProductConverter stringToProductConverter;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, StringToProductConverter stringToProductConverter, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.stringToProductConverter = stringToProductConverter;
        this.userRepository = userRepository;
    }

    public Optional<Order> addingOrder(String email, OrderDto orderDto) {
        Order order = new Order();
        order.setProducts(stringToProductConverter.stringToProduct(orderDto));
        order.setUsers(userRepository.findByEmail(email));
        Order savedOrder = orderRepository.save(order);
        return Optional.ofNullable(savedOrder);
    }
}
