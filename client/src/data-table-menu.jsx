import React from 'react';
import './data-table-menu.css';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const DataTableMenu = ({ order, setOrder, sorting }) => (
    <div className="container">
            <div onClick={() => sorting('name')} className="menu">
                Sort by name
            <IconButton onClick={() => setOrder(!order)}>
                {
                    order === "asc"
                        ? <ArrowDropDownIcon />
                        : <ArrowDropUpIcon />
                }
            </IconButton>
            </div>
    </div>
);

export default DataTableMenu;