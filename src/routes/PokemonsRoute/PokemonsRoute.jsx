import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonsList from '../../container/PokemonsList';

const PokemonsRoute = () => {
    const [textFind, setTextFind] = useState('');
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [pokemons, setPokemons] = useState([]);

    const [nextPage, setNextPage] = useState(true);

    useEffect(() => {
        const getPokemons = async() => {
            try {
                const response = await axios.get(nextUrl);
                const data = response.data
                const newPokemons = [...pokemons, ...data.results];

                setNextUrl(data.next);
                setPokemons(newPokemons);

                setNextPage(false);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }

        if (nextPage && nextUrl) getPokemons();
    }, [nextPage]);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        setNextPage(true);
    }

    const handleTextFind = (event) => {
        event.preventDefault();

        setTextFind(event.target.value);
    }

    return (
        <div>
            <form onSubmit={event => handleOnSubmit(event)}>
                <input type="text" placeholder="search..." value={textFind} onChange={event => handleTextFind(event)} />
                <button type="submit">find</button>
            </form>
            <PokemonsList pokemons={pokemons} />
        </div>
    );
};

export default PokemonsRoute;