import React from 'react';

import Pokemon from '../../components/Pokemon';

import './PokemonsList.scss';

const PokemonsList = ({pokemons, handleBuy}) => {

    return (
        <div className="main">
            <section className="pokemons">
                {
                    pokemons && pokemons.length > 0 &&
                    pokemons.map((pokemon, index) => {
                        return <Pokemon key={index} index={index} pokemon={pokemon} handleBuy={handleBuy} />;
                    })
                }
            </section>
        </div>
    )
};

export default PokemonsList;