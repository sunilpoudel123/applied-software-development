package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface WalletTransactionService {
    void recordTransaction(UUID walletId, UUID refId, TransactionType type, BigDecimal amount, String remarks);
    List<WalletTransaction> getTransactionsByWallet(UUID walletId);
}