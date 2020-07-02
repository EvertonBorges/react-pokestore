import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './Pokemon.scss';

const Pokemon = ({index, pokemon}) => {
    const [id, setId] = useState(index + 1);
    const [sprites, setSprites] = useState({});
    const [price, setPrice] = useState(0.0);

    useEffect(() => {
        const getPokemonDetails = async() => {
            const response = await axios.get(pokemon.url);
            const data = response.data;

            setId(data.id);
            setSprites(data.sprites);
            setPrice(Math.random() * 240 + 10)
        }

        getPokemonDetails();
    }, [pokemon]);

    return (
        <div className="pokemon">
            <div className="pokemon-header">{ id && `#${id}` } {pokemon.name}</div>
            { sprites && <img src={sprites.front_default} alt={pokemon.name}/> }
            { price && <div className="pokemon-price">{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price.toFixed(2)) }</div> }
            <button className="pokemon-buy-button">BUY</button>
        </div>
    );
}

export default Pokemon;