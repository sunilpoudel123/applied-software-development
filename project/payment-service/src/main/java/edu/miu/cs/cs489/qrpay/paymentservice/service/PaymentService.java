package edu.miu.cs.cs489.qrpay.paymentservice.service;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.Payment;

import java.math.BigDecimal;
import java.util.UUID;

public interface PaymentService {
    Payment initiatePayment(UUID payerUserId, UUID payeeUserId, BigDecimal amount, String qrCodeValue);
    Payment completePayment(UUID paymentRefId, boolean success);
    Payment getPaymentByRef(UUID paymentRefId);
}