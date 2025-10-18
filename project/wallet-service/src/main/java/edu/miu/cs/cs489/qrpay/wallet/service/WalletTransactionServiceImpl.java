package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
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
    public WalletTransaction recordTransaction(WalletTransactionRequestDTO requestDTO) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWalletId(requestDTO.getWalletId());
        transaction.setTransactionRefId(requestDTO.getTransactionRefId());
        transaction.setType(requestDTO.getTransactionType());
        transaction.setAmount(requestDTO.getAmount());
        transaction.setRemarks(requestDTO.getDescription());
        return transactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByWallet(UUID walletId) {
        return transactionRepository.findByWalletId(walletId);
    }
}