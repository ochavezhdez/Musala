package com.discussionforum.user;

import com.discussionforum.config.JwtTokenUtil;
import com.discussionforum.user.model.DTOUser;
import com.discussionforum.user.model.EntityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RestControllerUser {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ServiceUser userDetailsService;

    @PostMapping(value = "authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody EntityUser authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),
                    authenticationRequest.getPassWord()));
        } catch (DisabledException e) {
            return ResponseEntity.unprocessableEntity().body(new Exception("USER_DISABLED", e).getMessage());
        } catch (BadCredentialsException e) {
            return ResponseEntity.unprocessableEntity().body(new Exception("INVALID_CREDENTIALS", e).getMessage());
        }

        DTOUser dtoUser = userDetailsService.getUserByUserName(authenticationRequest.getUserName());

        final String token = jwtTokenUtil.generateToken(dtoUser);

        dtoUser.setToken(token);

        return ResponseEntity.ok(dtoUser);
    }

    @PostMapping(value = "register")
    public ResponseEntity<?> saveUser(@RequestBody EntityUser user) {
        try {
            return ResponseEntity.ok(userDetailsService.save(user));
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().body(e.getMessage());
        }
    }

}
