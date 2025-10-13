package edu.miu.cs.cs489.qrpay.qrservice.repository;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRTransactionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QRTransactionRepository extends JpaRepository<QRTransactionLog, UUID> {
    List<QRTransactionLog> findByQrCodeId(UUID qrCodeId);
}