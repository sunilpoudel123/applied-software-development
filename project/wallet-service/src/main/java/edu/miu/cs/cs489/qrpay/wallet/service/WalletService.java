package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.dto.WalletRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface WalletService {
    List<WalletResponseDTO> getWalletByUser(UUID userId);
    WalletResponseDTO createWallet(WalletRequestDTO walletDTO);
    WalletTransactionResponseDTO debit(WalletTransactionRequestDTO transactionDTO);
    WalletTransactionResponseDTO credit(WalletTransactionRequestDTO transactionDTO);
}