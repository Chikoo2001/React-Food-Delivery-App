import React, { useState } from 'react'
import { MdFastfood } from 'react-icons/md'
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import RowContainer from './RowContainer';

const MenuContainer = () => {

    const [filter, setFilter] = useState("rice");
    const { products } = useSelector((state) => state.products);

    return (
        <section className='w-full my-6' id='menu'>
            <div className='w-full flex flex-col items-center justify-between'>
                    
                    <p className='text-2xl pb-2 font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
                    before:content before:w-16 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                    transition-all ease-in-out duration-100 mr-auto'>
                        our hot dishes
                    </p>
                    <div className='flex items-center justify-start lg:justify-center gap-8 py-6 overflow-scroll scrollbar-hide w-full'>
                        {
                            categories && categories.map((category) => (
                                <motion.div
                                    whileTap={{ scale : 0.75 }}
                                    key={category.id}
                                    onClick={() => setFilter(category.urlParamName)}
                                    className={`${filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"} group w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col
                                    gap-3 items-center justify-center hover:bg-cartNumBg`}>
                                        <div className={`${filter === category.urlParamName ? "bg-card" : "bg-cartNumBg"} w-10 h-10 rounded-full group-hover:bg-card flex items-center justify-center`}>
                                            <MdFastfood className={`${filter === category.urlParamName ? "text-textColor" : "text-card"} group-hover:text-textColor text-lg`} />
                                        </div>
                                        <p className={`${filter === category.urlParamName ? "text-white" : "text-textColor"} text-sm group-hover:text-white`}>{category.name}</p>
                                </motion.div>
                            ))
                        }
                    </div>
            </div>
            <RowContainer flag={false} data={products && products.filter(product => product.category === filter)} />
        </section>
    )
}

export default MenuContainer
