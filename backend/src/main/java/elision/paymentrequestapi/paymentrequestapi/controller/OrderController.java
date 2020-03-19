package elision.paymentrequestapi.paymentrequestapi.controller;

import elision.paymentrequestapi.paymentrequestapi.dto.OrderInComingDto;
import elision.paymentrequestapi.paymentrequestapi.dto.OrderOutGoingDto;
import elision.paymentrequestapi.paymentrequestapi.model.Order;
import elision.paymentrequestapi.paymentrequestapi.model.Session;
import elision.paymentrequestapi.paymentrequestapi.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> addingOrderToUser(@RequestBody OrderInComingDto orderInComingDto) {
        return orderService.addingOrder(Session.getUsername(), orderInComingDto).map(created()).orElseGet(notFound());
    }

    @GetMapping
    public ResponseEntity<List<OrderOutGoingDto>> getOrdersByLoggedInUser() {
        return orderService.gettingOrder(Session.getUsername())
                .map(ok())
                .orElseGet(notFound());
    }
}
