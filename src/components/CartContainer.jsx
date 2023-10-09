import React, { useContext } from 'react'
import { MdOutlineKeyboardBackspace, MdOutlineRefresh } from 'react-icons/md';
import { motion } from 'framer-motion';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { CartContext } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../img/emptyCart.svg';
import { decreaseQuantity, emptyCart, increaseQuantity } from '../redux/slices/userSlice';

const CartContainer = () => {

    const { setShowCart } = useContext(CartContext);
    const { cartItems } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const calcTotal = () => {
        const total = cartItems.reduce((acc, item) => {
            return acc += parseFloat(item.price) * item.qty
        }, 0);
        return total;
    }

    let subTotal = calcTotal();

    return (
        <motion.div 
            initial={{ opacity: 0, x:200 }}
            animate={{ opacity: 1, x: 0}}  
            exit={{ opacity: 0, x: 200 }}
            className={`fixed top-0 right-0 z-[101] w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col`}>
        
            <div
                onClick={() => setShowCart(false)} 
                className='flex items-center justify-between w-full p-4'
            >
                <motion.div whileTap={{ scale : 0.75 }}><MdOutlineKeyboardBackspace className='text-textColor text-3xl cursor-pointer' /></motion.div>
                <p className='text-textColor font-semibold text-lg'>Cart</p>
                <motion.p 
                    onClick={() => dispatch(emptyCart())}
                    whileTap={{ scale : 0.75 }}
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
                    hover:shadow-md cursor-pointer text-textColor text-base'
                >
                    Clear <MdOutlineRefresh />
                </motion.p>    
            </div>

            <div className='flex flex-col w-full h-full bg-cartBg rounded-t-[2rem]'>
                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hide'>
                    { 
                        cartItems && cartItems.length > 0 
                        ? (
                            cartItems.map((item) => (
                                <div key={item.id} className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
                                        <img
                                            className='w-20 h-20 max-w-[60px] rounded-full object-contain'
                                            src={item.imageURL}
                                            alt="item"
                                        />
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-base text-gray-50'>{item.title}</p>
                                            <p className='text-sm block text-gray-300 font-semibold'>$ {item.price}</p>
                                        </div>
                                        <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                                            <motion.div 
                                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                                whileTap={{ scale : 0.75 }}
                                            >
                                                <HiMinus className='text-gray-50' />
                                            </motion.div>
                                            <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                                                {item.qty}
                                            </p>
                                            <motion.div 
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                                whileTap={{ scale : 0.75 }}
                                            >
                                                <HiPlus className='text-gray-50' />
                                            </motion.div>
                                        </div>
                                </div>
                            ))
                        )
                        : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                                <img className="w-300" src={EmptyCart} alt="" />
                                <p className='text-xl text-textColor font-semibold'>
                                    Add some items to cart
                                </p>
                            </div>
                        )
                    }
                </div>

                <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg'>Sub Total</p>
                        <p className='text-gray-400 text-lg'>$ {cartItems ? subTotal : 0.0}</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg'>Delivery</p>
                        <p className='text-gray-400 text-lg'>$ {cartItems.length > 0 ? 2.5 : 0.0}</p>
                    </div>
                    <div className='w-full border-b border-gray-600 my-2'></div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-200 text-xl font-semibold'>Total</p>
                        <p className='text-gray-200 text-xl font-semibold'>$ {cartItems.length > 0 ? subTotal + 2.5 : 0.0}</p>
                    </div>
                    <motion.button
                        whileTap={{ scale : 0.8 }}
                        className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'
                    >
                        Check Out
                    </motion.button>
                </div>

            </div>
        </motion.div>
    )
}

export default CartContainer
