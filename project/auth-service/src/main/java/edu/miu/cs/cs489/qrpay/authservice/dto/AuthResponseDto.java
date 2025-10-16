package edu.miu.cs.cs489.qrpay.authservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AuthResponseDto {
    private UUID userId;
    private String username;
    private String token;

    public AuthResponseDto(UUID userId, String username, String token) {
        this.userId = userId;
        this.username = username;
        this.token = token;
    }
}