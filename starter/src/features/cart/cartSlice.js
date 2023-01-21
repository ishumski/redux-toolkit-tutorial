import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async () => {
        try{
            const {data} = await axios.get(url)
            return data
        } catch (e) {

        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, payload) => {
            const {payload: itemId} = payload
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, payload) => {
            const {payload: itemId} = payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, payload) => {
            const {payload: itemId} = payload
            const cartItem = state.cartItems.find((item) => item.id === itemId)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach((item) => {

                amount += item.amount
                total += Number(item.amount) * Number(item.price)
            })
            state.amount = amount
            state.total = Number(total.toFixed(2))
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state)=>{
            state.isLoading = true
        },
        [getCartItems.fulfilled]:(state, action)=>{
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]:(state)=>{
            state.isLoading = false
        },

    }
})

export const {
    clearCart,
    removeItem,
    increase,
    decrease,
    calculateTotals
} = cartSlice.actions
export default cartSlice.reducer