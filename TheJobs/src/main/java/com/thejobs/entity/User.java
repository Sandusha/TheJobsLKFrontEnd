package com.thejobs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,
    generator = "id_table"
			)

	@SequenceGenerator(
		name = "id_table",
		sequenceName = "id_sequence",
		allocationSize = 1
	)
	
	private Integer userId;
	
	private String name;
	
	@Pattern(regexp = "^[0-9]{10}$", message = "Please enter valid mobile number")
	private String mobileNo;
	@Email(message = "Email should be a valid email")
	private String email;
	private String password;
	private String type;
	@OneToMany(cascade = CascadeType.ALL)
	@JsonIgnore
	List<Appointment> listOfAppointments = new ArrayList<>();
	

	

}

