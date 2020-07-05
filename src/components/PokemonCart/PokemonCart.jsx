import React from 'react';
import { Button } from 'react-bootstrap';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PokemonCart.scss';

const PokemonCart = ({ item, handleAmount, handleDelete }) => {
    return (
        <div>
            <Button className="btn__delete" variant="secondary" onClick={() => handleDelete(item)}>
                <FontAwesomeIcon icon={faTimes} />
            </Button>
            <div className="card__item">
                <div className="card__header">
                    <img className="card__img" src={item.src.front_default} alt={item.name}/>
                    <span className="card__description">{`#${item.id} ${item.name}`}</span>
                </div>
                <div className="card__amount">
                    <Button variant="secondary" size="sm" onClick={() => handleAmount(item, false)}>-</Button>
                    { item.amount }
                    <Button variant="secondary" size="sm" onClick={() => handleAmount(item, true)}>+</Button>
                    <span>x</span>
                    <span>{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.price.toFixed(2)) }</span>
                </div>
                <div className="card__total">
                    Total: <span>{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.price.toFixed(2) * item.amount) }</span>
                </div>
            </div>
        </div>
    );
}

export default PokemonCart;