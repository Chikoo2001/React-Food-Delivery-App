import React, { useEffect } from 'react'
import { Header } from './components'
import { Route, Routes } from 'react-router-dom'
import MainContainer from './components/MainContainer'
import CreateContainer from './components/CreateContainer'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { useDispatch } from 'react-redux'
import { setProducts } from './redux/slices/productsSlice'

const App = () => {

  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch(setProducts([...data]));
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='w-screen h-auto overflow-hidden bg-primary'>
      <Header />
      <main className='mt-24 md:mt-22 px-4 md:px-16 py-4 w-full'>
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/createItem' element={<CreateContainer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
