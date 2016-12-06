package de.frankhasenbalg.Events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by frank on 2016-12-06.
 */
@RestController
@RequestMapping("/event")
public class EventController {
    EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Event> getAll(){
        return eventRepository.findAllByOrderByDateAsc();
    }

//    @RequestMapping(value = "/affordable/{price}", method = RequestMethod.GET)
//    public List<Event> getAffordable(@PathVariable double price){
////        return events.stream().filter(x -> x.getPricePerNight() <= price)
////                .collect(Collectors.toList());
//        return eventRepository.findByPricePerNightLessThan(price);
//    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public List<Event> create(@RequestBody Event event){
//        events.add(event);
//        return events;
        eventRepository.save(event);
        return eventRepository.findAll();
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public List<Event> remove(@PathVariable long id){
        eventRepository.delete(id);
        return eventRepository.findAll();
    }
}
