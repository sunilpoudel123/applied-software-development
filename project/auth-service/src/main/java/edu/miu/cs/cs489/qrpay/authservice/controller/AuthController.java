package edu.miu.cs.cs489.qrpay.authservice.controller;


import edu.miu.cs.cs489.qrpay.authservice.dto.AuthResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.LoginRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user registration and login")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation (summary = "User Registration", description = "Register a new user and return authentication token")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterRequestDto request) {
        RegisterResponseDto response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    @Operation (summary = "User Login", description = "Authenticate user and return authentication token")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request) {
        AuthResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
