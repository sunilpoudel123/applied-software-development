package edu.miu.cs.cs489.qrpay.wallet.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "wallet_transactions")
@Getter
@Setter
public class WalletTransaction {
    @Id
    private UUID id;
    private UUID walletId;
    private UUID transactionRefId;
    @Enumerated(EnumType.STRING)
    private TransactionType type;
    private BigDecimal amount;
    private LocalDateTime timestamp;
    private String remarks;

    @PrePersist
    public void onCreate() {
        this.id = UUID.randomUUID();
        this.timestamp = LocalDateTime.now();
    }
}