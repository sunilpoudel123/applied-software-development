package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;

import java.math.BigDecimal;
import java.util.UUID;

public interface WalletService {
    Wallet getWalletByUser(UUID userId);
    Wallet createWallet(UUID userId);
    boolean debit(UUID userId, BigDecimal amount, UUID refId);
    boolean credit(UUID userId, BigDecimal amount, UUID refId);
}