import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name,region,area')
            .then(res => {
                console.log(res)
                setCountries(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div>DataTable
            <ul>
                {
                    countries.map((country, index) => <li key={index}>{country.name} {country.region} {country.area}</li>)
                }
            </ul>
        </div>
    )
}

export default DataTable