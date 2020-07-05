import React, { useState, useEffect } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';

import PokemonsList from '../../container/PokemonsList';
import Cart from '../../components/Cart';

import './PokemonsRoute.scss';

const PokemonsRoute = () => {
    const [textFind, setTextFind] = useState('');
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [showSeeMore, setShowSeeMore] = useState(true);
    const [showCartStore, setShowCartStore] = useState(false);
    const [cart, setCart] = useState([]);

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

    const handleCartStore = () => {
        const newValue = !showCartStore;
        setShowCartStore(newValue);
    }

    const handleBuy = (pokemon) => {
        const foundItem = cart.find(item => item.id === pokemon.id);
        if (foundItem) {
            handleAmount(foundItem, true);
            return;
        } else {
            const item = { 
                ...pokemon,
                amount: 1
            };
    
            const newCart = [...cart, item];
    
            setCart(newCart);
        }
    }

    const handleAmount = (itemCart, inc = true) => {
        const newCart = [...cart];
        const item = newCart.find(item => item.id === itemCart.id);
        if (inc) item.amount++; else {
            if (item.amount > 1) item.amount--;
        }
        
        setCart(newCart);
    }

    const handleDeleteItem = (itemCart) => {
        const newCart = [...cart];
        const index = newCart.findIndex(item => item.id === itemCart.id);
        if (index >= 0) {
            newCart.splice(index, 1);
            setCart(newCart);
        }
    }

    const handleDeleteAll = () => {
        setCart([]);
    }

    return (
        <>
            <main style={showCartStore ? { marginRight: 250 } : { marginRight: 75 }}>
                <Form className="ml-5 mr-5 mt-2 mb-4">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Search by pokemon name/number" value={textFind} onChange={event => handleTextFind(event)} />
                        <InputGroup.Prepend>
                            <Button variant="dark" type="submit">find</Button>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form>
                <PokemonsList 
                    pokemons={pokemonsFiltered} 
                    handleBuy={handleBuy} 
                />
                { showSeeMore && <Button className="mt-4 mb-5" variant="secondary" onClick={() => handleSeeMore()}>See more</Button> }
            </main>
            <Cart 
                cart={cart} 
                isShow={showCartStore} 
                handleCartStore={handleCartStore} 
                handleAmount={handleAmount} 
                handleDelete={handleDeleteItem}
                handleDeleteAll={handleDeleteAll}
            />
        </>
    );
};

export default PokemonsRoute;