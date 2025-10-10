use ads_dental;
-CREATE TABLE `user` (
                         `user_id` int NOT NULL AUTO_INCREMENT,
                         `username` varchar(50) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `role` varchar(20) NOT NULL,
                         PRIMARY KEY (`user_id`),
                         UNIQUE KEY `username` (`username`)
 )

CREATE TABLE `dentist` (
                           `dentist_id` int NOT NULL AUTO_INCREMENT,
                           `first_name` varchar(50) NOT NULL,
                           `last_name` varchar(50) NOT NULL,
                           `phone` varchar(20) DEFAULT NULL,
                           `email` varchar(100) DEFAULT NULL,
                           `specialization` varchar(100) DEFAULT NULL,
                           `user_id` int DEFAULT NULL,
                           PRIMARY KEY (`dentist_id`),
                           UNIQUE KEY `email` (`email`),
                           UNIQUE KEY `user_id` (`user_id`),
                           CONSTRAINT `dentist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
)

CREATE TABLE `patient` (
                           `patient_id` int NOT NULL AUTO_INCREMENT,
                           `first_name` varchar(50) NOT NULL,
                           `last_name` varchar(50) NOT NULL,
                           `phone` varchar(20) DEFAULT NULL,
                           `email` varchar(100) DEFAULT NULL,
                           `address` varchar(255) DEFAULT NULL,
                           `date_of_birth` date DEFAULT NULL,
                           `user_id` int DEFAULT NULL,
                           PRIMARY KEY (`patient_id`),
                           UNIQUE KEY `email` (`email`),
                           UNIQUE KEY `user_id` (`user_id`),
                           CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
)

CREATE TABLE `office_manager` (
                                  `manager_id` int NOT NULL AUTO_INCREMENT,
                                  `first_name` varchar(50) NOT NULL,
                                  `last_name` varchar(50) NOT NULL,
                                  `phone` varchar(20) DEFAULT NULL,
                                  `email` varchar(100) DEFAULT NULL,
                                  `user_id` int DEFAULT NULL,
                                  PRIMARY KEY (`manager_id`),
                                  UNIQUE KEY `email` (`email`),
                                  UNIQUE KEY `user_id` (`user_id`),
                                  CONSTRAINT `office_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
)

CREATE TABLE `bill` (
                        `bill_id` int NOT NULL AUTO_INCREMENT,
                        `appointment_id` int NOT NULL,
                        `amount` decimal(10,2) NOT NULL,
                        `status` enum('paid','unpaid') DEFAULT 'unpaid',
                        `issue_date` date NOT NULL,
                        PRIMARY KEY (`bill_id`),
                        UNIQUE KEY `appointment_id` (`appointment_id`),
                        CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`)
)

CREATE TABLE `surgery` (
                           `surgery_id` int NOT NULL AUTO_INCREMENT,
                           `name` varchar(100) NOT NULL,
                           `address` varchar(255) NOT NULL,
                           `phone` varchar(20) DEFAULT NULL,
                           PRIMARY KEY (`surgery_id`)
)

CREATE TABLE `appointment` (
                               `appointment_id` int NOT NULL AUTO_INCREMENT,
                               `appointment_date` date NOT NULL,
                               `appointment_time` time NOT NULL,
                               `status` enum('booked','completed','canceled') DEFAULT 'booked',
                               `dentist_id` int NOT NULL,
                               `patient_id` int NOT NULL,
                               `surgery_id` int NOT NULL,
                               PRIMARY KEY (`appointment_id`),
                               UNIQUE KEY `unique_dentist_schedule` (`dentist_id`,`appointment_date`,`appointment_time`),
                               KEY `patient_id` (`patient_id`),
                               KEY `surgery_id` (`surgery_id`),
                               CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`dentist_id`) REFERENCES `dentist` (`dentist_id`),
                               CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
                               CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`surgery_id`) REFERENCES `surgery` (`surgery_id`)
)