package edu.miu.cs.cs489.qrpay.wallet.repository;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {
    List<Wallet> findByUserId(UUID userId);
}