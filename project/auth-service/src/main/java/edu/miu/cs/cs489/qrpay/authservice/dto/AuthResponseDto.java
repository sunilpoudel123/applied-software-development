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
    private String firstName;
    private String lastName;

    public AuthResponseDto(UUID userId, String username, String token, String firstName, String lastName) {
        this.userId = userId;
        this.username = username;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}