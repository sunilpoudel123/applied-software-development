package edu.miu.cs.cs489.qrpay.paymentservice.service;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.Payment;
import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentStatus;
import edu.miu.cs.cs489.qrpay.paymentservice.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentTransactionService transactionService;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              PaymentTransactionService transactionService) {
        this.paymentRepository = paymentRepository;
        this.transactionService = transactionService;
    }
    @Override
    public Payment initiatePayment(UUID payerUserId, UUID payeeUserId, BigDecimal amount, String qrCodeValue) {
        Payment payment = new Payment();
        payment.setPayerUserId(payerUserId);
        payment.setPayeeUserId(payeeUserId);
        payment.setAmount(amount);
        payment.setQrCodeValue(qrCodeValue);
        payment.setStatus(PaymentStatus.INITIATED);

        Payment saved = paymentRepository.save(payment);
        transactionService.logTransaction(saved.getPaymentRefId(), PaymentStatus.INITIATED, "Payment initiated");
        return saved;
    }

    @Override
    public Payment completePayment(UUID paymentRefId, boolean success) {
        Payment payment = paymentRepository.findByPaymentRefId(paymentRefId)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + paymentRefId));

        payment.setStatus(success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
        payment.setCompletedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        String msg = success ? "Payment successful" : "Payment failed";
        transactionService.logTransaction(paymentRefId, payment.getStatus(), msg);

        return payment;
    }

    @Override
    public Payment getPaymentByRef(UUID paymentRefId) {
        return paymentRepository.findByPaymentRefId(paymentRefId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

}