package edu.miu.cs.cs489.qrpay.paymentservice.repository;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.PaymentTransactionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransactionLog, UUID> {
    List<PaymentTransactionLog> findByPaymentRefId(UUID paymentRefId);
}