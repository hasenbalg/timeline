package de.frankhasenbalg.Events;

import de.frankhasenbalg.Events.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by frank on 2016-12-06.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
    List<Event> findAllByOrderByDateAsc();
}
