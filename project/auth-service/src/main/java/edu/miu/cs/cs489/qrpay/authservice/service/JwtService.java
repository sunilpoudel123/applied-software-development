package edu.miu.cs.cs489.qrpay.authservice.service;

import edu.miu.cs.cs489.qrpay.authservice.domain.User;

public interface JwtService {
    String generateToken(User user);
    boolean validateToken(String token);
    String extractUsername(String token);
}