package com.example.demo.controller;

import com.example.demo.dto.ItemDto;
import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/additem")
    public ItemDto saveItem(@RequestBody ItemDto itemDto){
        return itemService.saveItem(itemDto);
    }

    @GetMapping(value = "/getitems")
    public List<ItemDto> getItems(){
        return itemService.getItems();
    }

    @DeleteMapping(value = "/deleteitem/{itemid}")
    public String deleteItem(@PathVariable Integer itemid){
        return itemService.deleteItem(itemid);
    }

    @GetMapping(value = "/getitem/{itemid}")
    public ItemDto getItem(@PathVariable Integer itemid){
        return itemService.getItem(itemid);
    }

    @PutMapping(value = "/updateitem")
    public String updateItem(@RequestBody ItemDto itemDto){
        System.out.println("Received item: " + itemDto);
        return itemService.updateItem(itemDto);
    }



}
