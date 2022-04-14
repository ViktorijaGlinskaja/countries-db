import './data-table.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TablePagination from '@mui/material/TablePagination';
import DataTableMenu from './data-table-menu';

const DataTable = () => {
    const [countries, setCountries] = useState([]);
    const [checked, setChecked] = useState(false);
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

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

    let oceaniaCountries = countries.filter(country => country.region === "Oceania")
    console.log(oceaniaCountries);

    const handleChange = () => {
        setChecked(!checked)
        if (!checked) {
            setCountries(oceaniaCountries)
        } else {
            axios.get('https://restcountries.com/v2/all?fields=name,region,area')
                .then(res => {
                    setCountries(res.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    };

    return (
        <div>
            <h1 className="table-name">Countries database</h1>
            <DataTableMenu order={order} setOrder={setOrder} sorting={sorting} />
            <div className="checkbox-container">
                <label>
                    <input type="checkbox" checked={checked} onChange={handleChange} />
                    Show only Oceania region countries
                </label>
            </div>
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
                        countries
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((country, index) =>
                                <tr key={index}>
                                    <td>{country.name}</td>
                                    <td>{country.region}</td>
                                    <td> {country.area}</td>
                                </tr>)
                    }
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[10, 20, 25]}
                        count={countries.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;
