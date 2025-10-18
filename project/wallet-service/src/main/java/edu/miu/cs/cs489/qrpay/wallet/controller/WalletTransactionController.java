package edu.miu.cs.cs489.qrpay.wallet.controller;

import edu.miu.cs.cs489.qrpay.wallet.dto.WalletTransactionResponseDTO;
import edu.miu.cs.cs489.qrpay.wallet.service.WalletTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
@Tag(name = "Wallet Transactions", description = "Endpoints for managing wallet transactions")
public class WalletTransactionController {

    private final WalletTransactionService service;

    public WalletTransactionController(WalletTransactionService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get Wallet Transactions", description = "Retrieve all wallet transactions for a specific user")
    public ResponseEntity<List<WalletTransactionResponseDTO>> getTransactionsByUserId(@PathVariable UUID userId) {
        List<WalletTransactionResponseDTO> transactions = service.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/transaction/{transactionId}")
    @Operation(summary = "Get Transaction by ID", description = "Retrieve details of a specific wallet transaction")
    public ResponseEntity<WalletTransactionResponseDTO> getTransactionById(@PathVariable UUID transactionId) {
        WalletTransactionResponseDTO transaction = service.getTransactionById(transactionId);
        return ResponseEntity.ok(transaction);
    }
}
