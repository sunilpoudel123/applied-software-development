package edu.miu.cs.cs489.qrpay.paymentservice.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payment_transaction_logs")
@Getter
@Setter
public class PaymentTransactionLog {

    @Id
    private UUID id;
    private UUID paymentRefId;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    private String message;
    private LocalDateTime timestamp;
    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.timestamp = LocalDateTime.now();
    }
}