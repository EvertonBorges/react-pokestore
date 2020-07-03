import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';

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
        <Card className="pokemon">
            <Card.Body>
                <Card.Title className="pokemon-header">{ id && `#${id}` } {pokemon.name}</Card.Title>
                { sprites && <Card.Img src={sprites.front_default} /> }
                { price && <Card.Text className="pokemon-price">{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price.toFixed(2)) }</Card.Text> }
                <Button className="pokemon-buy-button" variant="primary">BUY</Button>
            </Card.Body>
        </Card>
    );
}

export default Pokemon;