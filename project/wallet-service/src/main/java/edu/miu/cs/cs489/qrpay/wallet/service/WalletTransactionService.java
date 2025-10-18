package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface WalletTransactionService {
    WalletTransaction recordTransaction(WalletTransactionRequestDTO requestDTO);
    List<WalletTransaction> getTransactionsByWallet(UUID walletId);
}