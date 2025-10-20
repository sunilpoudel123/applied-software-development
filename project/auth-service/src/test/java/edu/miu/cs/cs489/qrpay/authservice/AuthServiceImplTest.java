package edu.miu.cs.cs489.qrpay.authservice;

import edu.miu.cs.cs489.qrpay.authservice.domain.Role;
import edu.miu.cs.cs489.qrpay.authservice.domain.RoleName;
import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import edu.miu.cs.cs489.qrpay.authservice.dto.LoginRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.repository.RoleRepository;
import edu.miu.cs.cs489.qrpay.authservice.repository.UserRepository;
import edu.miu.cs.cs489.qrpay.authservice.service.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Spy
    @InjectMocks
    private AuthServiceImpl authService;

    private User user;
    private Role role;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        role = new Role();
        role.setRoleName(RoleName.ROLE_MERCHANT);

        user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername("testuser");
        user.setPassword("encodedPass");
        user.setEmail("test@example.com");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setRoles(Set.of(role));
    }

    @Test
    void testLoginInvalidUser() {
        LoginRequestDto request = new LoginRequestDto("wronguser", "password");
        when(userRepository.findByUsernameOrEmail(any(), any())).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid username or password", ex.getMessage());
    }

    @Test
    void testLoginInvalidPassword() {
        LoginRequestDto request = new LoginRequestDto("testuser", "wrongpass");
        when(userRepository.findByUsernameOrEmail(any(), any())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(), any())).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid username or password", ex.getMessage());
    }

    @Test
    void testRegisterUsernameExists() {
        RegisterRequestDto request = new RegisterRequestDto(
                "Jane", "Doe", "Biz", "janedoe", "pass123", "jane@example.com", "9876543210", "ROLE_MERCHANT"
        );
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Username already exists", ex.getMessage());
    }

    @Test
    void testRegisterRoleNotFound() {
        RegisterRequestDto request = new RegisterRequestDto(
                "Tom", "Lee", "Biz", "tomlee", "pass123", "tom@example.com", "9876543210", "ROLE_MERCHANT"
        );

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(roleRepository.findByRoleName(RoleName.ROLE_MERCHANT)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Error: Role not found.", ex.getMessage());
    }
}
