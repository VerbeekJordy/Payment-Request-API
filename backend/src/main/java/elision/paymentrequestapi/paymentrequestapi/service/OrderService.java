package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderInComingDto;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.OrderMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Session;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.repository.OrderRepository;
import elision.paymentrequestapi.paymentrequestapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final StringToProductConverter stringToProductConverter;
    private final UserRepository userRepository;
    private final EmailGoogleService emailGoogleService;

    public OrderService(OrderRepository orderRepository, StringToProductConverter stringToProductConverter, UserRepository userRepository, EmailGoogleService emailGoogleService) {
        this.orderRepository = orderRepository;
        this.stringToProductConverter = stringToProductConverter;
        this.userRepository = userRepository;
        this.emailGoogleService = emailGoogleService;
    }

    public Optional<Order> addingOrder(String email, OrderInComingDto orderInComingDto) {
        Order order = new Order();
        order.setProducts(stringToProductConverter.stringToProduct(orderInComingDto));
        order.setUsers(userRepository.findByEmail(email));
        order.setCreatedAt(Date.valueOf(LocalDate.now()).toString());
        Order savedOrder = orderRepository.save(order);
        if (savedOrder != null) {
//            emailGoogleService.sendSimpleMessage(email, "Order demo", "Your purchase was accepted, thank you for your trust. We will be packaging your product soon.");
        }
        return Optional.ofNullable(savedOrder);
    }

    public Optional<List<OrderOutGoingDto>> gettingOrders(String email) {
        return Optional.ofNullable(OrderMapper.INSTANCE.orderToOrderDto(userRepository.findByEmail(email).getOrders()));
    }

    public Optional<OrderOutGoingDto> gettingOrder(Long id) {
       User user =  userRepository.findByEmail(Session.getUsername());
       List<Order> orders = user.getOrders();
       Order order = orderRepository.findById(id).get();
       boolean test = orders.contains(order);
        if (userRepository.findByEmail(Session.getUsername()).getOrders().contains(orderRepository.findById(id).get())) {
            return Optional.ofNullable(OrderMapper.INSTANCE.orderToOutgoingOrder(orderRepository.findById(id).get()));
        }
        return Optional.of(new OrderOutGoingDto());
    }
}
