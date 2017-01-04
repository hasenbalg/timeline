package de.frankhasenbalg.StaticController;

/**
 * Created by frank on 2016-12-06.
 */
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig  extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index2").setViewName("index2");
        registry.addViewController("/edit").setViewName("edit");
        registry.addViewController("/edit2").setViewName("edit2");
        registry.addViewController("/login").setViewName("index"); //no dedicated login page needed
    }



}
