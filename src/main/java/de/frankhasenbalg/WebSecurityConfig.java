package de.frankhasenbalg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    //https://spring.io/guides/gs/securing-web/
    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .antMatchers("/admin/**").access("hasRole('USER')")
//                .and().formLogin()
//                .csrf().disable()


        http
                .csrf().disable() //to not have to send the token with every rest request
                .authorizeRequests()
                .antMatchers("/", "/**/all", "/index").permitAll() //remove index2
                .antMatchers("/**/modify", "/**/create", "/**/delete/**").access("hasRole('USER')")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login").defaultSuccessUrl("/edit2")
                .permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/?logout")
                .permitAll();
    }

//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .inMemoryAuthentication()
//                .withUser("frank").password("huhu").roles("USER");
//    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        //https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples/spring-boot-sample-web-secure-jdbc
        auth.jdbcAuthentication().dataSource(this.dataSource);
    }
}