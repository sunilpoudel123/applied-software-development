package edu.miu.cs.cs489.qrpay.wallet.controller;

import edu.miu.cs.cs489.qrpay.wallet.dto.WalletRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionRequestDTO;
import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallets")
@Tag(name = "Wallet Management", description = "Endpoints for managing user wallets")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/")
    @Operation(summary = "Get Wallet", description = "Retrieve wallet details for a user")
    public ResponseEntity<WalletResponseDTO> getWallet() {
        WalletResponseDTO wallet = walletService.getWalletByUser();
        return ResponseEntity.ok(wallet);
    }

    @PostMapping("/create")
    @Operation(summary = "Create Wallet", description = "Create a new wallet for a user")
    public ResponseEntity<WalletResponseDTO> createWallet(@RequestBody WalletRequestDTO requestDTO) {
        WalletResponseDTO wallet = walletService.createWallet(requestDTO);
        return ResponseEntity.ok(wallet);
    }

    @PostMapping("/credit")
    @Operation(summary = "Credit Wallet", description = "Credit a specified amount to the user's wallet")
    public ResponseEntity<WalletTransactionResponseDTO> credit(@RequestBody WalletTransactionRequestDTO requestDTO) {
        WalletTransactionResponseDTO walletTransactionResponseDTO = walletService.credit(requestDTO);
        return ResponseEntity.ok(walletTransactionResponseDTO);
    }

    @PostMapping("/debit")
    @Operation(summary = "Debit Wallet", description = "Debit a specified amount from the user's wallet")
    public ResponseEntity<WalletTransactionResponseDTO> debit(@RequestBody WalletTransactionRequestDTO requestDTO) {
        WalletTransactionResponseDTO walletTransactionResponseDTO = walletService.debit(requestDTO);
        return ResponseEntity.ok(walletTransactionResponseDTO);
    }

}