import React from 'react';

const PokemonsList = ({pokemons}) => {
    return (
        <section className="pokemons">
            <ul>
                {
                    pokemons && pokemons.length > 0 &&
                    pokemons.map((pokemon, index) => {
                        return (
                            <li key={index} className="pokemon">
                                {index}) {pokemon.name}
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    )
};

export default PokemonsList;