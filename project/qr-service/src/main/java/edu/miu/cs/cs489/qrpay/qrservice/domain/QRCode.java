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
@Table(name = "qr_codes")
public class QRCode {
    @Id
    private UUID id;
    private String qrCodeValue;
    @Enumerated(EnumType.STRING)
    private QRType type;
    private UUID userId;
    private QRStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
        this.status = QRStatus.ACTIVE;
    }

}