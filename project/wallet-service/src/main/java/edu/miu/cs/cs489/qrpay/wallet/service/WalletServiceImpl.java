package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionService transactionService;

    public WalletServiceImpl(WalletRepository walletRepository, WalletTransactionService transactionService) {
        this.walletRepository = walletRepository;
        this.transactionService = transactionService;
    }

    @Override
    public Wallet getWalletByUser(UUID userId) {
        return walletRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wallet not found for user: " + userId));
    }

    @Override
    public Wallet createWallet(UUID userId) {
        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance(BigDecimal.ZERO);
        return walletRepository.save(wallet);
    }

    @Override
    public boolean debit(UUID userId, BigDecimal amount, UUID refId) {
        Wallet wallet = getWalletByUser(userId);
        if (wallet.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);

        transactionService.recordTransaction(wallet.getId(), refId, TransactionType.DEBIT, amount, "Debit for payment");
        return true;
    }

    @Override
    public boolean credit(UUID userId, BigDecimal amount, UUID refId) {
        Wallet wallet = getWalletByUser(userId);
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        transactionService.recordTransaction(wallet.getId(), refId, TransactionType.CREDIT, amount, "Credit from payment");
        return true;
    }
}