package edu.miu.cs.cs489.qrpay.wallet.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "wallets")
@Getter
@Setter
public class Wallet {

    @Id
    private UUID id;
    private UUID userId;
    private String username;// from Auth service
    private BigDecimal balance;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.updatedAt = LocalDateTime.now();
        if (this.balance == null) this.balance = BigDecimal.ZERO;
    }
}