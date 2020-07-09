import React from 'react';
import { Button } from 'react-bootstrap';

import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Cart.scss';

import PokemonCart from '../PokemonCart';

const Cart = ({ cart, isShow, handleCartStore, handleAmount, handleDelete, handleDeleteAll }) => {
    return (
        <section className={ isShow ? "cart cart__expanded" : "cart"}>
            <div className="cart__items">
                { isShow && 
                    <>
                        {
                            cart.map(item => 
                                <PokemonCart 
                                    key={item.id} 
                                    item={item} 
                                    handleAmount={handleAmount} 
                                    handleDelete={handleDelete}
                                />)
                        }
                    </>
                }
            </div>
                
            <div className="cart__footer">
                {
                    isShow && cart.length > 0 &&
                    <>
                        <span className="cart__total">Total: {
                            Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(cart.reduce((previousValue, currentValue) => {
                                return previousValue + currentValue.price * currentValue.amount
                            }, 0.0).toFixed(2))
                        }</span>
                        <Button variant="secondary" onClick={() => handleDeleteAll()}>FINISH</Button>
                    </>
                }
                <Button variant="secondary" className="btn__showHide" onClick={() => handleCartStore()}>
                    <FontAwesomeIcon icon={isShow ? faArrowRight : faArrowLeft } />
                </Button>
            </div>
        </section>
    );
}

export default Cart;