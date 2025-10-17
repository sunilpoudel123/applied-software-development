package edu.miu.cs.cs489.qrpay.qrcloudgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class QrCloudGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(QrCloudGatewayApplication.class, args);
    }

}
