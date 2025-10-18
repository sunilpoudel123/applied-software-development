package edu.miu.cs.cs489.qrpay.wallet.dto;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class WalletTransactionResponseDTO {
    private UUID transactionId;
    private UUID walletId;
    private BigDecimal amount;
    private String description;
    private TransactionType transactionType;
    private UUID transactionRefId;
    private LocalDateTime timestamp;
    private String status;
}