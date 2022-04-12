import './data-table.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DataTableMenu from './data-table-menu';

const DataTable = () => {
    const [countries, setCountries] = useState([]);
    const [order, setOrder] = useState("asc");

    const sorting = (col) => {
        if (order === "asc") {
            const sorted = [...countries].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCountries(sorted);
            setOrder("dsc");
        }
        if (order === "dsc") {
            const sorted = [...countries].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setCountries(sorted);
            setOrder("asc");
        }
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
            .then(res => {
                setCountries(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div>DataTable
            <DataTableMenu order={order} setOrder={setOrder} sorting={sorting} />
            <table className='data-table'>
                <thead>
                    <tr>
                        <th onClick={() => sorting('name')}>
                            Country
                            <IconButton onClick={() => setOrder(!order)}>
                                {
                                    order === "asc"
                                        ? <ArrowDropDownIcon />
                                        : <ArrowDropUpIcon />
                                }
                            </IconButton>
                        </th>
                        <th>Region</th>
                        <th>Country area</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countries.map((country, index) =>
                            <tr key={index}>
                                <td>{country.name}</td>
                                <td>{country.region}</td>
                                <td> {country.area}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DataTable