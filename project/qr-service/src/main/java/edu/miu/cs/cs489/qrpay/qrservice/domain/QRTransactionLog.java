package edu.miu.cs.cs489.qrpay.qrservice.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "qr_transaction_logs")
public class QRTransactionLog {
    @Id
    private UUID id;
    private UUID qrCodeId;
    private UUID userId;

    @Enumerated(EnumType.STRING)
    private QRAction action;
    private UUID paymentRefId;
    private LocalDateTime timestamp;
    private String remarks;

    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.timestamp = LocalDateTime.now();
    }
}