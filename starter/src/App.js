import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {calculateTotals} from "./features/cart/cartSlice";

import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import CartContainer from "./components/CartContainer";

const App = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(calculateTotals())
    }, [cartItems])
    return (
        <main>
            <Modal/>
            <NavBar/>
            <CartContainer/>
        </main>
    )
}
export default App;
