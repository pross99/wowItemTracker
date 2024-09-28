import React, { useEffect, useState } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../api/axiosConfig';

const Hero = ({ items, onDelete }) => {
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchImageUrls = async () => {
            const urls = {};
            for (const item of items) {
                try {
                    const response = await axiosInstance.get(`/api/v1/items/image/${item.wowheadId}`); // Adjust this endpoint as necessary
                    urls[item.wowheadId] = response.data.imageUrl; // Assume the API returns { imageUrl: '...' }
                } catch (error) {
                    console.error(`Error fetching image for ${item.wowheadId}:`, error);
                }
            }
            setImageUrls(urls);
        };

        if (items.length > 0) {
            fetchImageUrls();
        }
    }, [items]);

    const handleDelete = async (wowheadId) => {
        try {
            await axiosInstance.delete(`/api/v1/items/${wowheadId}`);
            onDelete(wowheadId);
        } catch (error) {
            console.error(error);
        }
    }};