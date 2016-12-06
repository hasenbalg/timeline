package de.frankhasenbalg.StaticController;

/**
 * Created by frank on 2016-12-06.
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
        @RequestMapping("/")
        public String index() {
            return "index";
        }

        @RequestMapping("/edit")
        public String edit() {
            return "edit";
        }


}
