import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';



function EditItem(props) {
    const [itemName,setItemName] = userState('')
    const [wowheadId,setWowheadId] = userState('')
    const [slot,setSlot] = userState('')
    const [link,setLink] = userState('')
    const [expansion,setExpansion] = userState('')
    const [location,setLocation] = userState('')
    const [backdrops,setBackdrops] = userState('')
    const [userId,setUserId] = userState('')


    const handleEdit = async (wowheadId) => {
        try {
          await axiosInstance.put(`/api/v1/items/${wowheadId}`);
          console.log(wowheadId)
          onDelete(wowheadId);
        } catch (error) {
          console.error(error);
        }
      };

















}

