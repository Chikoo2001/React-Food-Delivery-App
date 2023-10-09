import React, { useContext, useState } from 'react';
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineXMark } from 'react-icons/hi2'
import { motion } from 'framer-motion';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { addFromDb, removeUser, setUser } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {

  const [isMenu, setIsMenu] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { setShowCart } = useContext(CartContext);
  const dispatch = useDispatch();

  const { userInfo, cartItems } = useSelector((state) => state.user);

  const login = async () => {
    if(!userInfo) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const userInfo = result.user;
        dispatch(setUser({...userInfo}));
        const docRef = doc(firestore, "carts", userInfo.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        const { cartItems } = data;
        cartItems.forEach((item) => dispatch(addFromDb(item)))
      } catch(error) {
        console.log(error);
      } 
    } else {
      setIsMenu(!isMenu);
    }
  }

  const logout = () => {
    signOut(auth)
    .then(() => {
      dispatch(removeUser());
      setIsMenu(false);
    })
    .catch((error) => console.log(error));
  }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
        {/* desktop & tablet */}
        <div className='hidden h-full w-full md:flex'>
          
          <Link to="/" className='flex items-center gap-2'>
            <img className='w-8 object-cover' src={Logo} alt='logo' />
            <p className='text-headingColor text-xl font-bold'>City</p>
          </Link>

          <div className="flex flex-1 justify-end items-center gap-8">
            <ul className='flex items-center gap-8'>
              <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'><a href="#home">Home</a></li>
              <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'><a href='#menu'>Menu</a></li>
              <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
              <li onClick={() => setIsMenu(false)} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
            </ul>

            <div 
              className='relative flex items-center justify-center'
            >
              <MdShoppingBasket onClick={() => setShowCart(true)} className='text-textColor text-2xl cursor-pointer' />
              <div className='w-5 h-5 rounded-full bg-cartNumBg absolute -top-2 -right-2 flex justify-center items-center'>
                <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
              </div>
            </div>

            <div className='relative'>
              <motion.img
                whileTap={{ scale: 0.6 }}
                className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                referrerPolicy='no-referrer' 
                src={userInfo ? userInfo.photoURL : Avatar} 
                alt="userprofile"
                onClick={login}
              />
              {
                isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.6 }} 
                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                    {
                      userInfo && userInfo.email === "chaitanyadharmgutte1234@gmail.com" && (
                        <Link to='/createItem' 
                          className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                          transition-all duration-100 ease-in-out text-textColor text-base'
                          onClick={() => setIsMenu(false)}
                        >
                          New Item <MdAdd />
                        </Link>
                      )
                    }
                    <p 
                      className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                      transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={logout}
                    >
                      Logout <MdLogout />
                    </p>
                  </motion.div>
              )
              }
            </div>
          </div>

        </div>

        {/* mobile */}
        <div className='flex h-full w-full md:hidden'>
          <Link to="/" className='flex items-center gap-2'>
            <img className='w-8 object-cover' src={Logo} alt='logo' />
            <p className='text-headingColor text-xl font-bold'>City</p>
          </Link>

          <div
            className='flex justify-end items-center flex-1 gap-8'
          >
            <div className='relative flex items-center justify-center'>
              <MdShoppingBasket  onClick={() => setShowCart(true)}  className='text-textColor text-2xl cursor-pointer' />
              <div className='w-5 h-5 rounded-full bg-cartNumBg absolute -top-2 -right-2 flex justify-center items-center'>
                <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
              </div>
            </div>

            <div className='relative'>
              <motion.img
                whileTap={{ scale: 0.6 }}
                className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                referrerPolicy='no-referrer' 
                src={userInfo ? userInfo.photoURL : Avatar} 
                alt="userprofile"
                onClick={login}
              />
              {
                isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.6 }} 
                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                    {
                      userInfo && userInfo.email === "chaitanyadharmgutte1234@gmail.com" && (
                        <p 
                          className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                          transition-all duration-100 ease-in-out text-textColor text-base'
                        >
                          New Item <MdAdd />
                        </p>
                      )
                    }
                    <p 
                      className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                      transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={logout}
                    >
                      Logout <MdLogout />
                    </p>
                  </motion.div>
              )
              }
            </div>

            <div
              className='cursor-pointer'
              onClick={() => setToggle(true)}
            >
              <AiOutlineMenu className='text-2xl' />
            </div>
          </div>

          <motion.ul
            className={`flex flex-col gap-8 w-screen h-screen items-center justify-center absolute bg-white top-0 
            transition-all duration-500 ease-in-out ${toggle ? 'right-0' : 'right-full'}`}>
            <li
              onClick={() => setToggle(false)} 
              className='cursor-pointer text-2xl'
            >
              <HiOutlineXMark />
            </li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
          </motion.ul>

        </div>
    </header>
  )
}

export default Header;
