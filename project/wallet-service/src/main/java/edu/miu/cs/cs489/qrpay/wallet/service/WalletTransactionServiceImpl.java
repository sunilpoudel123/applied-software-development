package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletTransactionRepository;
import edu.miu.cs.cs489.qrpay.wallet.util.WalletTransactionMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {


    private final WalletTransactionRepository transactionRepository;

    private final WalletTransactionMapper mapper;

    public WalletTransactionServiceImpl(WalletTransactionRepository transactionRepository, WalletTransactionMapper mapper) {
        this.transactionRepository = transactionRepository;
        this.mapper = mapper;
    }

    @Override
    public WalletTransaction recordTransaction(WalletTransactionRequestDTO requestDTO) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWalletId(requestDTO.getWalletId());
        transaction.setTransactionRefId(requestDTO.getTransactionRefId());
        transaction.setType(requestDTO.getTransactionType());
        transaction.setAmount(requestDTO.getAmount());
        transaction.setUserId(requestDTO.getUserId());
        transaction.setDescription(requestDTO.getDescription());
        transaction.setTransactionRefId(UUID.randomUUID());
        transaction.setStatus("COMPLETED");
        return transactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByWallet(UUID walletId) {
        return transactionRepository.findByWalletId(walletId);
    }

    public List<WalletTransactionResponseDTO> getTransactionsByUserId(UUID userId) {
        List<WalletTransaction> transactions = transactionRepository.findByUserId(userId);

        if (transactions.isEmpty()) {
            throw new RuntimeException("No transactions found for user: " + userId);
        }

        return transactions.stream()
                .map(mapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public WalletTransactionResponseDTO getTransactionById(UUID transactionId) {
        WalletTransaction transaction = transactionRepository   .findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found with ID: " + transactionId));

        return mapper.toResponseDTO(transaction);
    }

}