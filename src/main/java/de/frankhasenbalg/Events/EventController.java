package de.frankhasenbalg.Events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by frank on 2016-12-06.
 */
@RestController
@CrossOrigin
@RequestMapping("/event")
public class EventController {
    EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Event> getAll(){
        return eventRepository.findAllByOrderByDateAsc();
    }

    @CrossOrigin
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public List<Event> create(@RequestBody Event event){
        eventRepository.save(event);
        return eventRepository.findAllByOrderByDateAsc();
    }

    @CrossOrigin
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public List<Event> remove(@PathVariable long id){
        eventRepository.delete(id);
        return eventRepository.findAllByOrderByDateAsc();
    }
    @CrossOrigin
    @RequestMapping(value = "/modify", method = RequestMethod.POST)
    public List<Event> modify(@RequestBody Event event){
        eventRepository.delete(event.getId());
        eventRepository.save(event);
        return eventRepository.findAllByOrderByDateAsc();
    }
}
