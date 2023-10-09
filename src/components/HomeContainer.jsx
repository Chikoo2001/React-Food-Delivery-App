import React from 'react';

import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';

import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <div className='flex flex-col py-2 items-start justify-center gap-6'>
        
        <div className='flex items-center justify-center gap-2 bg-orange-100 rounded-full p-2'>
          <p className='text-base font-semibold text-orange-500'>Bike Delivery</p>
          <div className='w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl'>
            <img 
              className='w-full h-full object-cover'
              src={Delivery} 
              alt="bike"   
            />
          </div>
        </div>

        <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
          The Fastest Delivery in <span className='text-[3rem] lg:text-[5rem] text-orange-600'>Your City</span>
        </p>

        <p className='text-base text-textColor text-left md:w-[80%]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatibus eum, eos facere atque libero animi repellendus ea! Odio, dolorem officiis consequatur quibusdam autem unde cum magni officia quae quis?
        </p>

        <button 
          className='w-full md:w-auto px-4 py-2 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
          type="button"
        >
          Order Now
        </button>
      </div>
      <div className='py-2 flex flex-1 items-center relative'>
        
        <img 
            className='ml-auto h-420 lg:h-650 w-full lg:w-auto'
            src={HeroBg} 
            alt="" 
        />

        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center flex-wrap gap-4 lg:px-18 
        xl:px-20 2xl:px-44 py-4'>
                {
                    heroData.map((item) => (
                        <div 
                            key={item.id} 
                            className='p-4 lg:w-190 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'
                        >
                            <img 
                                className='w-20 lg:w-40 -mt-10 lg:-mt-20'
                                src={item.imageSrc} 
                                alt={item.name} 
                            />
                            <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{item.name}</p>
                            <p className='my-1 lg:my-3 text-[12px] lg:text-sm text-lighttextGray font-semibold'>{item.decp}</p>
                            <p className='text-sm font-semibold text-headingColor'><span className='text-xs text-red-600'>$</span> {item.price}</p>
                        </div>
                    ))
                }
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
