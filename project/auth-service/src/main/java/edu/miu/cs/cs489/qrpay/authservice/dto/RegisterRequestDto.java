package edu.miu.cs.cs489.qrpay.authservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequestDto(

        @NotBlank(message = "Username is required.")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters.")
        String username,

        @NotBlank(message = "Password is required.")
        @Size(min = 6, max = 100, message = "Password must be at least 6 characters long.")
        String password,

        @NotBlank(message = "Email is required.")
        @Email(message = "Email should be a valid email address.")
        @Size(max = 100, message = "Email cannot exceed 100 characters.")
        String email,

        @Pattern(regexp = "^$|^[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits.")
        String phoneNumber,

        String roleName
) {

}