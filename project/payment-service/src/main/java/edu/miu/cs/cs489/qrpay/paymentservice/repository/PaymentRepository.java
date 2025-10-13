package edu.miu.cs.cs489.qrpay.paymentservice.repository;

import edu.miu.cs.cs489.qrpay.paymentservice.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findByPaymentRefId(UUID paymentRefId);
}