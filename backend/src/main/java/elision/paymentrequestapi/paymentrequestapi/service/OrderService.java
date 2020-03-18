package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderInComingDto;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.OrderMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.repository.OrderRepository;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Optional<Order> addingOrder(String email, OrderInComingDto orderInComingDto) {
        Order order = new Order();
        order.setProducts(stringToProductConverter.stringToProduct(orderInComingDto));
        order.setUsers(userRepository.findByEmail(email));
        Order savedOrder = orderRepository.save(order);
        return Optional.ofNullable(savedOrder);
    }

    public Optional<List<OrderOutGoingDto>> gettingOrder(String email){
       return Optional.ofNullable(OrderMapper.INSTANCE.orderToOrderDto(userRepository.findByEmail(email).getOrders()));
    }
}
