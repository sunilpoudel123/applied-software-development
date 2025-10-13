package edu.miu.cs.cs489.qrpay.paymentservice.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    private UUID id;
    private UUID paymentRefId;        // unique transaction ref
    private UUID payerUserId;
    private UUID payeeUserId;
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;     // INITIATED, SUCCESS, FAILED
    private String qrCodeValue;       // from QR service
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.paymentRefId = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
        this.status = PaymentStatus.INITIATED;
    }
}
