package edu.miu.cs.cs489.qrpay.wallet;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;
import java.util.UUID;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletRepository;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletServiceImpl;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletTransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

class WalletServiceImplTest {

    @Mock
    private WalletRepository walletRepository;

    @Mock
    private WalletTransactionService transactionService;

    @Spy
    @InjectMocks
    private WalletServiceImpl walletService;

    private Wallet wallet;
    private WalletTransactionRequestDTO requestDTO;
    private WalletTransaction transaction;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        wallet = new Wallet();
        wallet.setId(UUID.randomUUID());
        wallet.setBalance(new BigDecimal("100.00"));

        requestDTO = new WalletTransactionRequestDTO();
        requestDTO.setWalletId(wallet.getId());
        requestDTO.setAmount(new BigDecimal("50.00"));

        transaction = new WalletTransaction();
        transaction.setId(UUID.randomUUID());
    }

    @Test
    void testCredit() {
        doReturn(wallet).when(walletService).getWalletById(wallet.getId());
        when(walletRepository.save(any(Wallet.class))).thenReturn(wallet);
        when(transactionService.recordTransaction(any())).thenReturn(transaction);

        WalletTransactionResponseDTO response = walletService.credit(requestDTO);

        assertNotNull(response);
        assertEquals(new BigDecimal("150.00"), wallet.getBalance());
        verify(walletRepository, times(1)).save(wallet);
        verify(transactionService, times(1)).recordTransaction(any());
    }

    @Test
    void testDebitSuccess() {
        doReturn(wallet).when(walletService).getWalletById(wallet.getId());
        when(walletRepository.save(any(Wallet.class))).thenReturn(wallet);
        when(transactionService.recordTransaction(any())).thenReturn(transaction);

        WalletTransactionResponseDTO response = walletService.debit(requestDTO);

        assertNotNull(response);
        assertEquals(new BigDecimal("50.00"), wallet.getBalance());
        verify(walletRepository, times(1)).save(wallet);
        verify(transactionService, times(1)).recordTransaction(any());
    }

    @Test
    void testDebitInsufficientBalance() {
        requestDTO.setAmount(new BigDecimal("200.00")); // more than balance
        doReturn(wallet).when(walletService).getWalletById(wallet.getId());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> walletService.debit(requestDTO));
        assertEquals("Insufficient balance", ex.getMessage());

        verify(walletRepository, never()).save(any());
        verify(transactionService, never()).recordTransaction(any());
    }
}
