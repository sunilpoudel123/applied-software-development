package edu.miu.cs.cs489.qrpay.wallet.dto;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class WalletTransactionRequestDTO {
    private BigDecimal amount;
    private String description;
    private TransactionType transactionType;
    private UUID walletId;
    private UUID transactionRefId;
    private UUID userId;
}
