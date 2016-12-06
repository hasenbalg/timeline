package de.frankhasenbalg.Events;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by frank on 2016-12-06.
 */
@Entity
public class Event {
    @Id
    @GeneratedValue//(strategy = GenerationType.SEQUENCE)
    private long id;
    @Column(nullable = false)
    private String heading;
    @Column(nullable = false)
    private String text;
    @Column(nullable = false)
    private String img_url;
    @Column(nullable = false)
    private Date date;

    public Event(String heading, String text, Date date) {
        this.heading = heading;
        this.text = text;
        this.date = date;
    }

    public Event() {
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHeading() {
        return heading;
    }

    public String getText() {
        return text;
    }

    public String getImg_url() {
        return img_url;
    }

    public Date getDate() {
        return date;
    }

    public long getId() {
        return id;
    }
}
