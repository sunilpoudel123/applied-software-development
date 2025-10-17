package edu.miu.cs.cs489.qrpay.authservice.service;

import edu.miu.cs.cs489.qrpay.authservice.domain.Role;
import edu.miu.cs.cs489.qrpay.authservice.domain.RoleName;
import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import edu.miu.cs.cs489.qrpay.authservice.domain.UserType;
import edu.miu.cs.cs489.qrpay.authservice.dto.AuthResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.LoginRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.repository.RoleRepository;
import edu.miu.cs.cs489.qrpay.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public RegisterResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.username());
        user.setFirstName( request.firstName());
        user.setLastName(request.lastName());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEmail(request.email());
        System.out.println(roleRepository.findAll());
        Role userRole = roleRepository.findByRoleName(RoleName.ROLE_MERCHANT)
                .orElseThrow(() -> new RuntimeException("Error: Role not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);
        user.setActive(true);
        user.setPhoneNumber(request.phoneNumber());
        user.setUserType( UserType.MERCHANT);
        User saved = userRepository.save(user);

        Set<String> roleNames = saved.getRoles().stream()
                .map(role -> role.getRoleName().name())
                .collect(Collectors.toSet());

        return new RegisterResponseDto(
                saved.getId(),
                saved.getUsername(),
                saved.getEmail(),
                roleNames
        );
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByUsernameOrEmail(request.username(), request.username())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateAccessToken(user);
        return new AuthResponseDto(user.getId(), user.getUsername(), token, user.getFirstName(), user.getLastName());
    }
}