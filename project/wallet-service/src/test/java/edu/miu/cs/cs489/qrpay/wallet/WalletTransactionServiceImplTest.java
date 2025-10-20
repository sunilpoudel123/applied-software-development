package edu.miu.cs.cs489.qrpay.wallet;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.*;

import edu.miu.cs.cs489.qrpay.wallet.domain.TransactionType;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletTransactionRepository;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletTransactionServiceImpl;
import edu.miu.cs.cs489.qrpay.wallet.util.WalletTransactionMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class WalletTransactionServiceImplTest {

    @Mock
    private WalletTransactionRepository transactionRepository;

    @Mock
    private WalletTransactionMapper mapper;

    @InjectMocks
    private WalletTransactionServiceImpl transactionService;

    private WalletTransactionRequestDTO requestDTO;
    private WalletTransaction transaction;
    private WalletTransactionResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        requestDTO = new WalletTransactionRequestDTO();
        requestDTO.setWalletId(UUID.randomUUID());
        requestDTO.setTransactionType(TransactionType.CREDIT);
        requestDTO.setAmount(new BigDecimal("100.00"));
        requestDTO.setUserId(UUID.randomUUID());
        requestDTO.setDescription("Test transaction");

        transaction = new WalletTransaction();
        transaction.setId(UUID.randomUUID());
        transaction.setWalletId(requestDTO.getWalletId());
        transaction.setAmount(requestDTO.getAmount());
        transaction.setStatus("COMPLETED");

        responseDTO = new WalletTransactionResponseDTO();
        responseDTO.setTransactionId(transaction.getId());
    }

    @Test
    void testRecordTransaction() {
        when(transactionRepository.save(any(WalletTransaction.class))).thenReturn(transaction);
        WalletTransaction saved = transactionService.recordTransaction(requestDTO);
        assertNotNull(saved);
        assertEquals("COMPLETED", saved.getStatus());
        verify(transactionRepository, times(1)).save(any(WalletTransaction.class));
    }

    @Test
    void testGetTransactionsByWallet() {
        UUID walletId = requestDTO.getWalletId();
        when(transactionRepository.findByWalletId(walletId)).thenReturn(List.of(transaction));
        List<WalletTransaction> result = transactionService.getTransactionsByWallet(walletId);
        assertEquals(1, result.size());
        verify(transactionRepository, times(1)).findByWalletId(walletId);
    }

    @Test
    void testGetTransactionsByUserIdNoTransactions() {
        UUID userId = requestDTO.getUserId();
        when(transactionRepository.findByUserId(userId)).thenReturn(Collections.emptyList());
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> transactionService.getTransactionsByUserId(userId));
        assertEquals("No transactions found for user: " + userId, ex.getMessage());
    }

    @Test
    void testGetTransactionByIdSuccess() {
        UUID transactionId = transaction.getId();
        when(transactionRepository.findById(transactionId)).thenReturn(Optional.of(transaction));
        when(mapper.toResponseDTO(transaction)).thenReturn(responseDTO);
        WalletTransactionResponseDTO result = transactionService.getTransactionById(transactionId);
        assertNotNull(result);
        verify(transactionRepository, times(1)).findById(transactionId);
        verify(mapper, times(1)).toResponseDTO(transaction);
    }
}
