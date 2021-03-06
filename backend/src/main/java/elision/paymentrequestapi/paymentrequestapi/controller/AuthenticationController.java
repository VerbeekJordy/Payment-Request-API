package elision.paymentrequestapi.paymentrequestapi.controller;

import elision.paymentrequestapi.paymentrequestapi.config.TokenProvider;
import elision.paymentrequestapi.paymentrequestapi.dto.ResetPassword;
import elision.paymentrequestapi.paymentrequestapi.dto.UserDto;
import elision.paymentrequestapi.paymentrequestapi.dto.UserLoginDto;
import elision.paymentrequestapi.paymentrequestapi.model.AuthToken;
import elision.paymentrequestapi.paymentrequestapi.model.User;
import elision.paymentrequestapi.paymentrequestapi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.notFound;
import static elision.paymentrequestapi.paymentrequestapi.util.ControllerUtils.ok;


@RestController
public class AuthenticationController {

    final private AuthenticationManager authenticationManager;

    final private TokenProvider jwtTokenUtil;

    final private UserService userService;

    public AuthenticationController(AuthenticationManager authenticationManager, TokenProvider jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping(value = "/login")
    public ResponseEntity register(@RequestBody UserLoginDto loginUser) throws AuthenticationException {
        System.out.println(loginUser);
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getEmail(),
                        loginUser.getPassword()
                )

        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<User> addNewUser(@RequestBody UserDto userDto) {
        User addedUser = userService.save(userDto);
        return new ResponseEntity<>(addedUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/token")
    public ResponseEntity createToken(@RequestBody String email) {
        userService.createToken(email);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = "/reset")
    public ResponseEntity<User> resetPassword(@RequestBody ResetPassword resetPassword){
       return userService.resetPassword(resetPassword).map(ok()).orElseGet(notFound());
    }

}