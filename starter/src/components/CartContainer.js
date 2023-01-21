import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";
import {openModal} from "../features/modal/modalSlice";
import {getCartItems} from "../features/cart/cartSlice";

const CartContainer = () => {
    const dispatch = useDispatch()
    const {cartItems, total, amount, isLoading} = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems())
    }, [])

    if (isLoading) {
        return (
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <section className='cart'>
            {/* cart header */}
            <header>
                <h2>your bag</h2>
            </header>
            {/* cart items */}
            {
                amount && cartItems.length
                    ? <>
                        <div>
                            {cartItems.map((item) => {
                                return <CartItem key={item.id} {...item} />;
                            })}
                        </div>
                        {/* cart footer */}
                        <footer>
                            <hr/>
                            <div className='cart-total'>
                                <h4>
                                    total <span>${total}</span>
                                </h4>
                            </div>
                            <button
                                onClick={() => dispatch(openModal())}
                                className='btn clear-btn'
                            >
                                clear cart
                            </button>
                        </footer>
                    </>
                    : <h4 className='empty-cart'>is currently empty</h4>
            }
        </section>
    );
};

export default CartContainer;