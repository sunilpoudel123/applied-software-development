package edu.miu.cs.cs489.qrpay.qrservice.repository;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface QRCodeRepository extends JpaRepository<QRCode, UUID> {
    Optional<QRCode> findByQrCodeValue(String qrCodeValue);
}