package edu.miu.cs.cs489.qrpay.paymentservice.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record PaymentRequestDto(
        UUID payerUserId,
        UUID payeeUserId,
        BigDecimal amount,
        String qrCodeValue
) {}