package com.geredu.cotizaciones.cotizaciones_backend.controller;


import com.geredu.cotizaciones.cotizaciones_backend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    record LoginRequest(String email, String password) {
        public String getEmail() {
            return email;
        }
        public String getPassword() {
            return password;
        }
    }

    record JwtResponse(String token) {}
}

