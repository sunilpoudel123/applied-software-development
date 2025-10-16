package edu.miu.cs.cs489.qrpay.authservice.service;

import edu.miu.cs.cs489.qrpay.authservice.domain.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateAccessToken(User user);
    boolean validateToken(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    String extractUsername(String token);
}