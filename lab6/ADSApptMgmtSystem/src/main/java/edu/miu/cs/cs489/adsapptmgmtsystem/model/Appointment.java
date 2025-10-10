package edu.miu.cs.cs489.adsapptmgmtsystem.model;

import edu.miu.cs.cs489.adsapptmgmtsystem.util.AppointmentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointment",
        uniqueConstraints = @UniqueConstraint(
                name = "unique_dentist_schedule",
                columnNames = {"dentist_id", "appointment_date", "appointment_time"}
        ))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Integer appointmentId;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "enum('booked','completed','canceled') default 'booked'")
    private AppointmentStatus status = AppointmentStatus.BOOKED;

    @ManyToOne
    @JoinColumn(name = "dentist_id", nullable = false)
    private Dentist dentist;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "surgery_id", nullable = false)
    private Surgery surgery;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
    private Bill bill;


    public Appointment(LocalDate of, LocalTime of1, AppointmentStatus appointmentStatus) {
        this.appointmentDate = of;
        this.appointmentTime = of1;
        this.status = appointmentStatus;
    }
}