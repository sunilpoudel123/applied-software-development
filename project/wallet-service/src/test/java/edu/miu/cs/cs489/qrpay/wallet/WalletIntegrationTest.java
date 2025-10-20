package edu.miu.cs.cs489.qrpay.wallet;

import edu.miu.cs.cs489.qrpay.wallet.domain.Wallet;
import edu.miu.cs.cs489.qrpay.wallet.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class WalletIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WalletRepository walletRepository;

    @BeforeEach
    void setup() {
        walletRepository.deleteAll();
    }

    @Test
    void testCreditEndpoint() throws Exception {
        Wallet wallet = new Wallet();
        wallet.setBalance(BigDecimal.valueOf(100));
        walletRepository.save(wallet);

        mockMvc.perform(post("/api/wallet/credit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {"walletId": "%s", "amount": 50.0}
                """.formatted(wallet.getId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newBalance").value(150.0));

        Wallet updated = walletRepository.findById(wallet.getId()).get();
        assertEquals(BigDecimal.valueOf(150), updated.getBalance());
    }
}
