package com.website.welltalk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WelltalkApplication {

	public static void main(String[] args) {
		SpringApplication.run(WelltalkApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(String[] args){
		return runner -> {
			System.out.println("\nWelltalk Application is successfully running...");
		};
	}

}
