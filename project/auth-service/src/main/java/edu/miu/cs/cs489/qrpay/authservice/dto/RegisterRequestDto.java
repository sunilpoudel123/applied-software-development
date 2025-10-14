package edu.miu.cs.cs489.qrpay.authservice.dto;

public record RegisterRequestDto(
        String username,
        String password,
        String email
) {
}
