package com.example.demo.service;

import com.example.demo.dto.ItemDto;
import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemService {
    
    @Autowired
    private ItemRepo itemRepo;
    
    @Autowired
    private ModelMapper modelMapper;
    
    public ItemDto saveItem(ItemDto itemDto){
        itemRepo.save(modelMapper.map(itemDto, Item.class));
        return itemDto;
    }

    public List<ItemDto> getItems(){
        List<Item> itemList = itemRepo.findAll();
        return modelMapper.map(itemList,new TypeToken<List<ItemDto>>(){}.getType());
    }

    public String deleteItem(Integer itemid){
        itemRepo.deleteById(itemid);
        return "Delete Item";
    }

    public ItemDto getItem(Integer itemid){
        Optional<Item> item = itemRepo.findById(itemid);
        return modelMapper.map(item, ItemDto.class);
    }

    public String updateItem(ItemDto itemDto){
        itemRepo.save(modelMapper.map(itemDto, Item.class));
        return "Item Updated";
    }
}
