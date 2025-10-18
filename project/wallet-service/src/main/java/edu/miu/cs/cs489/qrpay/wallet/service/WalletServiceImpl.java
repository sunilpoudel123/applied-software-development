package edu.miu.cs.cs489.qrpay.wallet.service;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
    public WalletResponseDTO getWalletByUser() {
        Wallet wallet = getWallet();
        return toWalletResponseDTO(wallet);
    }
    private UUID getUserIdFromAuthContext(){
        //todo fetch from user log in session
//        return UUID.randomUUID();
        return UUID.fromString("A8D37798-3BD1-42C6-8D80-E14F311AA5DA");
    }

    private Wallet getWallet() {
        Wallet wallet= walletRepository.findByUserId(getUserIdFromAuthContext())
               .orElseThrow(() -> new RuntimeException("Wallet not found for user: "
                       + getUserIdFromAuthContext()));
        return wallet;
    }

    @Override
    public WalletResponseDTO createWallet(WalletRequestDTO walletDTO) {
        Wallet wallet = new Wallet();
        wallet.setUserId(getUserIdFromAuthContext());
        wallet.setWalletName(walletDTO.getWalletName());
        wallet.setCurrency(walletDTO.getCurrency());
        wallet.setBalance(walletDTO.getBalance());
        walletRepository.save(wallet);
        
        return toWalletResponseDTO(wallet);
    }

    @Override
    public WalletTransactionResponseDTO debit(WalletTransactionRequestDTO transactionDTO) {
        Wallet wallet = getWallet();
        if (wallet.getBalance().compareTo(transactionDTO.getAmount()) < 0)
            throw new RuntimeException("Insufficient balance");

        wallet.setBalance(wallet.getBalance().subtract(transactionDTO.getAmount()));
        walletRepository.save(wallet);
        WalletTransaction transaction = transactionService.recordTransaction(transactionDTO);
        WalletTransactionResponseDTO response = getWalletTransactionResponseDTO(transactionDTO, transaction, wallet);

        return response;
    }

    private static WalletTransactionResponseDTO getWalletTransactionResponseDTO(WalletTransactionRequestDTO transactionDTO,
                                                                                WalletTransaction transaction, Wallet wallet) {
        WalletTransactionResponseDTO response = new WalletTransactionResponseDTO();
        response.setTransactionId(transaction.getId());
        response.setWalletId(wallet.getId());
        response.setAmount(transactionDTO.getAmount());
        response.setDescription(transactionDTO.getDescription());
        response.setTransactionType(transactionDTO.getTransactionType());
        response.setTransactionRefId(transactionDTO.getTransactionRefId());
        response.setTimestamp(transaction.getTimestamp());
        response.setStatus("SUCCESS");
        return response;
    }


    @Override
    public WalletTransactionResponseDTO credit(WalletTransactionRequestDTO transactionRequestDTO) {
        Wallet wallet = getWallet();
        wallet.setBalance(wallet.getBalance().add(transactionRequestDTO.getAmount()));
        walletRepository.save(wallet);
        WalletTransaction transaction = transactionService.recordTransaction(transactionRequestDTO);
        WalletTransactionResponseDTO response = getWalletTransactionResponseDTO(transactionRequestDTO, transaction, wallet);

        return response;
    }

    public WalletResponseDTO toWalletResponseDTO( Wallet wallet) {
        WalletResponseDTO dto = new WalletResponseDTO();
        dto.setId(wallet.getId());
        dto.setUserId(wallet.getUserId());
        dto.setWalletName(wallet.getWalletName());
        dto.setCurrency(wallet.getCurrency());
        dto.setBalance(wallet.getBalance());
        return dto;
    }
}