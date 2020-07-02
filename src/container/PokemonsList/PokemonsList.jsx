import React from 'react';

import Pokemon from '../../components/Pokemon';

import './PokemonsList.scss';

const PokemonsList = ({pokemons}) => {
    return (
        <section className="pokemons">
            {
                pokemons && pokemons.length > 0 &&
                pokemons.map((pokemon, index) => {
                    return (
                        <Pokemon key={index} index={index} pokemon={pokemon} />
                    );
                })
            }
        </section>
    )
};

export default PokemonsList;