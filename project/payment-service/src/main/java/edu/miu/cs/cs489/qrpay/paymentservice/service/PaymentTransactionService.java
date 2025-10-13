package edu.miu.cs.cs489.qrpay.paymentservice.service;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentStatus;
import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentTransactionLog;

import java.util.List;
import java.util.UUID;

public interface PaymentTransactionService {
    void logTransaction(UUID paymentRefId, PaymentStatus status, String message);
    List<PaymentTransactionLog> getLogsByPayment(UUID paymentRefId);
}