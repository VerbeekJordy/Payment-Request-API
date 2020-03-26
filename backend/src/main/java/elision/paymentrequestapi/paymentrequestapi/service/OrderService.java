package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.converter.OrderToOrderOutgoingDtoConverter;
import elision.paymentrequestapi.paymentrequestapi.converter.StringToProductConverter;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderInComingDto;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.mapper.OrderMapper;
import elision.paymentrequestapi.paymentrequestapi.mapper.PaymentMapper;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Payment;
import elision.paymentrequestapi.paymentrequestapi.model.Session;
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
    private final OrderToOrderOutgoingDtoConverter orderToOrderOutgoingDtoConverter;

    public OrderService(OrderRepository orderRepository, StringToProductConverter stringToProductConverter, UserRepository userRepository, EmailGoogleService emailGoogleService, OrderToOrderOutgoingDtoConverter orderToOrderOutgoingDtoConverter) {
        this.orderRepository = orderRepository;
        this.stringToProductConverter = stringToProductConverter;
        this.userRepository = userRepository;
        this.emailGoogleService = emailGoogleService;
        this.orderToOrderOutgoingDtoConverter = orderToOrderOutgoingDtoConverter;
    }

    public Optional<Order> addingOrder(String email, OrderInComingDto orderInComingDto) {
        Order order = new Order();
        Payment payment = PaymentMapper.INSTANCE.paymentDtoToPayment(orderInComingDto.getPaymentDto());
        payment.setPaymentStatus("Pending");
        order.setPayment(payment);
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
        return Optional.ofNullable(orderToOrderOutgoingDtoConverter.orderListToListOrderOutgoingDto(userRepository.findByEmail(email).getOrders()));
    }

    public Optional<OrderOutGoingDto> gettingOrder(Long id) {
        if (userRepository.findByEmail(Session.getUsername()).getOrders().contains(orderRepository.findById(id).get())) {
            return Optional.ofNullable(orderToOrderOutgoingDtoConverter.orderToOrderOutgoingDto(orderRepository.findById(id).get()));
        }
        return Optional.of(new OrderOutGoingDto());
    }
}
