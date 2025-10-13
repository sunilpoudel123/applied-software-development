package edu.miu.cs.cs489.qrpay.wallet.repository;

import edu.miu.cs.cs489.qrpay.wallet.domain.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, UUID> {
    List<WalletTransaction> findByWalletId(UUID walletId);
}