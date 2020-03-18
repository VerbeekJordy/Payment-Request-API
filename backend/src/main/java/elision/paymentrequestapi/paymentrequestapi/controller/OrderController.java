package elision.paymentrequestapi.paymentrequestapi.controller;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Session;
import elision.paymentrequestapi.paymentrequestapi.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.created;
import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.notFound;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> addingOrderToUser(@RequestBody OrderDto orderDto) {
        return orderService.addingOrder(Session.getUsername(), orderDto).map(created()).orElseGet(notFound());
    }
}
