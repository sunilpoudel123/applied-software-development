package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;

import java.util.List;
import java.util.UUID;

public interface WalletTransactionService {
    WalletTransaction recordTransaction(WalletTransactionRequestDTO requestDTO);
    List<WalletTransaction> getTransactionsByWallet(UUID walletId);
    List<WalletTransactionResponseDTO>   getTransactionsByUserId(UUID userId);
    WalletTransactionResponseDTO  getTransactionById(UUID transactionId);
}