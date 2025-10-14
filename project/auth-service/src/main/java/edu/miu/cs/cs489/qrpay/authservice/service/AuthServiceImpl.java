package edu.miu.cs.cs489.qrpay.authservice.service;

import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import edu.miu.cs.cs489.qrpay.authservice.dto.AuthResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.LoginRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(UserRole.USER);

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);

        return new AuthResponseDto(saved.getId(), saved.getUsername(), token);
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponseDto(user.getId(), user.getUsername(), token);
    }
}