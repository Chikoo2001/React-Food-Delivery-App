import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const [showCart, setShowCart] = useState(false);

    return (
        <CartContext.Provider value={{showCart, setShowCart}}>
            {children}
        </CartContext.Provider>
    )
};

export default CartContextProvider;