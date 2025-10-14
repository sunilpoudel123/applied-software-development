package edu.miu.cs.cs489.qrpay.authservice.service;

import edu.miu.cs.cs489.qrpay.authservice.dto.AuthResponseDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.LoginRequestDto;
import edu.miu.cs.cs489.qrpay.authservice.dto.RegisterRequestDto;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto request);
    AuthResponseDto login(LoginRequestDto request);
}