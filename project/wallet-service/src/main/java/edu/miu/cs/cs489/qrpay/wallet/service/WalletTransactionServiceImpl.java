package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {


    private final WalletTransactionRepository transactionRepository;

    public WalletTransactionServiceImpl(WalletTransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void recordTransaction(UUID walletId, UUID refId, TransactionType type, BigDecimal amount, String remarks) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWalletId(walletId);
        transaction.setTransactionRefId(refId);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setRemarks(remarks);
        transactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByWallet(UUID walletId) {
        return transactionRepository.findByWalletId(walletId);
    }
}