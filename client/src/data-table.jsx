import './data-table.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
    const [countries, setCountries] = useState([]);

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
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Country</th>
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