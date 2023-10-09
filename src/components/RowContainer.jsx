import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';

import NotFound from "../img/NotFound.svg";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/userSlice';

const RowContainer = ({flag, data, scrollValue}) => {
    
    const dispatch = useDispatch();

    const rowContainer = useRef();

    useEffect(() => {
        rowContainer.current.scrollLeft = scrollValue;
    }, [scrollValue])
  return (
    <div
        ref={rowContainer}
        className={`w-full flex items-center gap-4 my-12 scroll-smooth ${flag ? "overflow-x-scroll scrollbar-hide" : "overflow-x-hidden flex-wrap justify-center"}`}
    >
      { data && data.length > 0 ? (data?.map((i) => (
        <div key={i?.id} className='w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay hover:drop-shadow-lg backdrop-blur-lg rounded-lg my-12 py-2 px-4 flex flex-col items-center justify-evenly relative'>
            <div className='flex items-center justify-between w-full'>
                <motion.img 
                    whileHover={{ scale : 1.2 }}
                    src={i.imageURL}
                    alt="" 
                    className='w-40 -mt-10 drop-shadow-2xl'
                />
                <div className='flex flex-col items-end justify-end w-full mt-8'>
                    <motion.div 
                        onClick={() => dispatch(addToCart(i))}
                        whileTap={{ scale : 0.75 }}
                        className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
                    >
                        <MdShoppingBasket className='text-white' />
                    </motion.div>
                    <div className='flex flex-col items-end justify-end w-full mt-8'>
                        <p className='text-base text-textColor font-semibold md:text-lg'>
                            {i.title}
                        </p>
                        <p className='mt-1 text-sm text-gray-500'>
                            {i.calories} cal
                        </p>
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-500'>$ </span>{i.price}
                        </p>
                    </div>
                </div>
            </div>
        </div> )
      )) : (
        <div className='flex flex-col items-center justify-center w-full'>
            <img 
                className='h-340'
                src={NotFound} 
                alt="Not Found" 
            />
            <p className='text-xl text-headingColor font-semibold'>Items not available</p>
        </div>
      )
        
      }
    </div>
  )
}

export default RowContainer
