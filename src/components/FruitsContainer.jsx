import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useSelector } from 'react-redux';

const FruitsContainer = () => {
    const {products} = useSelector(state => state.products);
    const [scrollValue, setScrollValue] = useState(0);

    const checkScroll = (value) => {
        value && setScrollValue(0);
    }
  return (
    <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
            
            <p className='text-2xl pb-2 font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
            before:content before:w-32 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
            transition-all ease-in-out duration-100'>
                our tasty & healthy fruits
            </p>

            <div className='hidden md:flex gap-3 items-center'>
                <motion.div
                    onClick={() => scrollValue && setScrollValue(scrollValue - 200)}
                    whileTap={{ scale : 0.75 }} 
                    className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 cursor-pointer
                    transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
                        <MdChevronLeft className='text-lg text-white' />
                </motion.div>
                <motion.div 
                    onClick={() => setScrollValue(scrollValue + 200)}
                    whileTap={{ scale : 0.75 }} 
                    className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 cursor-pointer
                    transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
                        <MdChevronRight className='text-lg text-white' />
                </motion.div>
            </div>

        </div>
        <RowContainer flag={true} scrollValue={scrollValue} checkScroll={checkScroll} data={products && products.filter(product => product.category === "fruits")} />
    </section>
  )
}

export default FruitsContainer
