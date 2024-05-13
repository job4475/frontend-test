import { StateContext } from '@/context/Context';
import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useContext, useEffect, useState } from 'react';

function Handinputservice() {
    const { state, setState } = useContext(StateContext);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [serviceChannels, setServiceChannels] = useState([]);
    const [serviceHours, setServiceHours] = useState([]);
    const [selectedVendors, setSelectedVendors] = useState([]);

    useEffect(() => {
        if (state.universalInfo && state.universalInfo.dataResponse) {
            const filteredOptions = state.universalInfo.dataResponse.filter(item => item.uin_catalog_en === "Vendor");
            const categories = state.universalInfo.dataResponse.filter(option => option.uin_catalog_en === "Service Category");
            const channels = state.universalInfo.dataResponse.filter(option => option.uin_catalog_en === "Service Channel");
            const hours = state.universalInfo.dataResponse.filter(option => option.uin_catalog_en === "Service Hour");
            setState((prevData) => ({ ...prevData, vendor: filteredOptions })); 
            setServiceCategories(categories);
            setServiceChannels(channels);
            setServiceHours(hours);
        } else {
            console.error("state.universalInfo or state.universalInfo.dataResponse is undefined");
        }
    }, [state.universalInfo]);
    
    const handleChange = (event) => {
        setState((prevData) => ({ ...prevData, selectedvendor: event.target.value }));
          
    };

    const handleCategoryChange = (event) => {
        setState((prevData) => ({ ...prevData, selectedCategory: event.target.value }));
    };

    const handleChannelChange = (event) => {
        setState((prevData) => ({ ...prevData, selectedChannel: event.target.value }));
    };

    const handleHourChange = (event) => {
        setState((prevData) => ({ ...prevData, selectedHour: event.target.value }));
    };

    return (
        <div>
            <FormControl>
                <InputLabel id="vendor-select-label"></InputLabel>
                <Autocomplete multiple id="vendor-select" options={state.vendor}getOptionLabel={(option) => option.uin_desc_en}onChange={(event, newValue) => setSelectedVendors(newValue)}
                    value={selectedVendors}renderInput={(params) => <TextField {...params} />}/>
            </FormControl>

            <FormControl>
                <InputLabel id="category-select-label">Service Category</InputLabel>
                <Select labelId="category-select-label"id="category-select"value={state.selectedCategory}label="Service Category"onChange={handleCategoryChange}>
                    {serviceCategories.map((option, index) => (
                        <MenuItem key={index} value={option.uin_desc_en}>{option.uin_desc_en}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="channel-select-label">Service Channel</InputLabel>
                <Select labelId="channel-select-label"id="channel-select"value={state.selectedChannel}label="Service Channel"onChange={handleChannelChange}>
                    {serviceChannels.map((option, index) => (
                        <MenuItem key={index} value={option.uin_desc_en}>{option.uin_desc_en}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="hour-select-label">Service Hour</InputLabel>
                <Select labelId="hour-select-label" id="hour-select" value={state.selectedHour} label="Service Hour"onChange={handleHourChange}>
                    {serviceHours.map((option, index) => (
                        <MenuItem key={index} value={option.uin_desc_en}>{option.uin_desc_en}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Handinputservice;
