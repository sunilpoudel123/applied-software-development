package edu.miu.cs.cs489.qrpay.paymentservice.service;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentStatus;
import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentTransactionLog;
import edu.miu.cs.cs489.qrpay.paymentservice.repository.PaymentTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PaymentTransactionServiceImpl implements PaymentTransactionService {

    private final PaymentTransactionRepository transactionRepository;

    public PaymentTransactionServiceImpl(PaymentTransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    @Override
    public void logTransaction(UUID paymentRefId, PaymentStatus status, String message) {
        PaymentTransactionLog log = new PaymentTransactionLog();
        log.setPaymentRefId(paymentRefId);
        log.setStatus(status);
        log.setMessage(message);
        transactionRepository.save(log);
    }

    @Override
    public List<PaymentTransactionLog> getLogsByPayment(UUID paymentRefId) {
        return transactionRepository.findByPaymentRefId(paymentRefId);
    }
}