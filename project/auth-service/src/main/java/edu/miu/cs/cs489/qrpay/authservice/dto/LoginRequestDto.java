package edu.miu.cs.cs489.qrpay.authservice.dto;

public record LoginRequestDto(
        String username,
        String password
) {
}
