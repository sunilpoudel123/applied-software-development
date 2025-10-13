package edu.miu.cs.cs489.qrpay.qrservice.service;

import edu.miu.cs.cs489.qrpay.qrservice.domain.QRAction;
import edu.miu.cs.cs489.qrpay.qrservice.domain.QRTransactionLog;
import edu.miu.cs.cs489.qrpay.qrservice.repository.QRTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QRTransactionServiceImpl implements QRTransactionService {

    private final QRTransactionRepository qrTransactionRepository;

    public QRTransactionServiceImpl(QRTransactionRepository qrTransactionRepository) {
        this.qrTransactionRepository = qrTransactionRepository;
    }

    @Override
    public void logTransaction(UUID qrCodeId, UUID userId, QRAction action, UUID paymentRefId, String remarks) {
        QRTransactionLog log = new QRTransactionLog();
        log.setQrCodeId(qrCodeId);
        log.setUserId(userId);
        log.setAction(action);
        log.setPaymentRefId(paymentRefId);
        log.setRemarks(remarks);
        qrTransactionRepository.save(log);
    }

    @Override
    public List<QRTransactionLog> getTransactionsByQRCode(UUID qrCodeId) {
        return qrTransactionRepository.findByQrCodeId(qrCodeId);
    }
}