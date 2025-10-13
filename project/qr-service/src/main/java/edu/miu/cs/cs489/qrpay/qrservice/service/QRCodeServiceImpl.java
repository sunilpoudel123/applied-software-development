package edu.miu.cs.cs489.qrpay.qrservice.service;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRCode;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRStatus;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRType;
import edu.miu.cs.cs489.qrpay.qrservice.repository.QRCodeRepository;
import edu.miu.cs.cs489.qrpay.qrservice.util.QRCodeGenerator;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class QRCodeServiceImpl implements QRCodeService {

    private final QRCodeRepository qrCodeRepository;

    public QRCodeServiceImpl(QRCodeRepository qrCodeRepository) {
        this.qrCodeRepository = qrCodeRepository;
    }

    @Override
    public QRCode generateQRCode(UUID userId, QRType type) {
        QRCode qr = new QRCode();
        qr.setUserId(userId);
        qr.setType(type);
        qr.setQrCodeValue(QRCodeGenerator.generateUUIDCode());
        qr.setCreatedAt(LocalDateTime.now());
        qr.setExpiresAt(LocalDateTime.now().plusMinutes(10)); // configurable TTL
        qr.setStatus(QRStatus.ACTIVE);
        return qrCodeRepository.save(qr);
    }

    @Override
    public QRCode getQRCode(String qrCodeValue) {
        return qrCodeRepository.findByQrCodeValue(qrCodeValue)
                .orElseThrow(() -> new RuntimeException("QR Code not found"));
    }

    @Override
    public void updateStatus(UUID qrCodeId, QRStatus status) {
        QRCode qr = qrCodeRepository.findById(qrCodeId)
                .orElseThrow(() -> new RuntimeException("QR Code not found"));
        qr.setStatus(status);
        qrCodeRepository.save(qr);
    }
}