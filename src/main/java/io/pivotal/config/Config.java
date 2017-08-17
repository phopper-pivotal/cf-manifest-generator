package io.pivotal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


public class Config {
  
  @Configuration
  @Profile("cloud")
  static class CloudConfiguration {
    
  }
}