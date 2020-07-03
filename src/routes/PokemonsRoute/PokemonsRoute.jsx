import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';

import PokemonsList from '../../container/PokemonsList';

const PokemonsRoute = () => {
    const [textFind, setTextFind] = useState('');
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [showSeeMore, setShowSeeMore] = useState(true);

    const [nextPage, setNextPage] = useState(true);

    useEffect(() => {
        const getPokemons = async() => {
            try {
                const response = await axios.get(nextUrl);
                const data = response.data
                const newPokemons = [...pokemons, ...data.results];

                setNextUrl(data.next);
                setPokemons(newPokemons);
                setShowSeeMore(textFind.length <= 0);

                if (textFind.length <= 0) setPokemonsFiltered(newPokemons);

                setNextPage(false);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }

        if (nextPage && nextUrl) getPokemons();
    }, [nextPage]);

    const handleTextFind = (event) => {
        event.preventDefault();

        const newTextFind = event.target.value

        setTextFind(newTextFind);

        if (newTextFind) {
            setPokemonsFiltered(pokemons.filter(pokemon => pokemon.name.includes(newTextFind)));
            setShowSeeMore(false);
        } else {
            setPokemonsFiltered(pokemons);
            setShowSeeMore(true);
        }
    }

    const handleSeeMore = () => {
        setNextPage(true);
    }

    return (
        <div>
            <Form className="ml-5 mr-5 mt-2 mb-4">
                <InputGroup>
                    <Form.Control type="text" placeholder="Search by pokemon name/number" value={textFind} onChange={event => handleTextFind(event)} />
                    <InputGroup.Prepend>
                        <Button variant="dark" type="submit">find</Button>
                    </InputGroup.Prepend>
                </InputGroup>
            </Form>
            <PokemonsList pokemons={pokemonsFiltered} />
            { showSeeMore && <Button className="mt-4 mb-5" variant="secondary" onClick={() => handleSeeMore()}>See more</Button> }
        </div>
    );
};

export default PokemonsRoute;