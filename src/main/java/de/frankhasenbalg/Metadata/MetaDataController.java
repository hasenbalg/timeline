package de.frankhasenbalg.Metadata;

import de.frankhasenbalg.Metadata.MetaData;
import de.frankhasenbalg.Metadata.MetaDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by frank on 2016-12-06.
 */
@RestController
@RequestMapping("/metadata")
public class MetaDataController {
    MetaDataRepository metaDataRepository;

    @Autowired
    public MetaDataController(MetaDataRepository metaDataRepository){
        this.metaDataRepository = metaDataRepository;
    }
    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<MetaData> getAll(){
        return metaDataRepository.findAll();
    }
    @CrossOrigin
    @RequestMapping(value = "/modify", method = RequestMethod.POST)
    public List<MetaData> mofify(@RequestBody MetaData md){
        metaDataRepository.deleteAll();
        metaDataRepository.save(md);
        return metaDataRepository.findAll();
    }
}
