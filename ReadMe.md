# Timeline

needed:
- mysql server running on localhost containing the database timeline;

the sql is:
create database timeline;
use timeline;
#run it once

insert into timeline.event ( date, heading, text, img_url ) values ( NOW(), "Ueberschrift 1", "hier koennte ihre werbung stehen!", "http://fillmurray.com/200/300");
insert into timeline.event ( date, heading, text , img_url) values ( NOW(), "Ueberschrift 2", "was anderes!", "http://fillmurray.com/g/200/300");
insert into timeline.event ( date, heading, text , img_url) values ( NOW(), "Ueberschrift 3", "nochwas anderes!", "http://fillmurray.com/200/300");

## References
Architecture: https://www.youtube.com/playlist?list=PLVApX3evDwJ1i1KQYCcyS9hpSy_zOgU0Y, 2016-06-12
Order results: http://stackoverflow.com/a/27427359/4062341, 2016-06-12
Mysql connection: https://www.youtube.com/watch?v=DKfVx7kPZQQ, 2016-06-12
http://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html, 2016-06-12
http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html, 2016-06-12

Display static page: http://www.ekiras.com/2016/06/how-to-display-static-html-in-springboot-mvc.html, 2016-06-12