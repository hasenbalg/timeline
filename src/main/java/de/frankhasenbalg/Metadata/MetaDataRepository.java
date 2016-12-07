package de.frankhasenbalg.Metadata;

import de.frankhasenbalg.Events.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by frank on 2016-12-06.
 */
@Repository
public interface MetaDataRepository extends JpaRepository<MetaData, Long>{

}
