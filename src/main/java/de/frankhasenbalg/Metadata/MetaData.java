package de.frankhasenbalg.Metadata;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by frank on 2016-12-07.
 */
@Entity
public class MetaData {
    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false)
    private String heading;
    @Column(nullable = false)
    private String backgroundImgPath;

    public MetaData(String heading, String backgroundImgPath) {
        this.heading = heading;
        this.backgroundImgPath = backgroundImgPath;
    }

    public MetaData(){}

    public String getHeading() {
        return heading;
    }

    public String getBackgroundImgPath() {
        return backgroundImgPath;
    }
}