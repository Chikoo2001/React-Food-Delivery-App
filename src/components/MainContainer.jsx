import React, { useContext } from 'react';

import HomeContainer from './HomeContainer';
import FruitsContainer from './FruitsContainer';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import { CartContext } from '../context/CartContext';

const MainContainer = () => {

  const { showCart } = useContext(CartContext);

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />
      <FruitsContainer />
      <MenuContainer />
      {
        showCart && <CartContainer />
      }
    </div>
  )
}

export default MainContainer
