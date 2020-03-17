package elision.paymentrequestapi.paymentrequestapi.controller;

import elision.paymentrequestapi.paymentrequestapi.dto.AddingOrderToUserDto;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.service.UserService;
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

    private final UserService userService;

    public OrderController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> addingOrderToUser(@RequestBody AddingOrderToUserDto addingOrderToUserDto) {
        return userService.addOrderToUser(addingOrderToUserDto.getEmail(), addingOrderToUserDto.getOrderDto()).map(created()).orElseGet(notFound());
    }
}
