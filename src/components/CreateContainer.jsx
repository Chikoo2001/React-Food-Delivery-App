import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { setProducts } from '../redux/slices/productsSlice';
import { useDispatch } from 'react-redux';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch(setProducts([...data]));
  }

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log(uploadProgress);
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg('Error while uploading : Try Again');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setImageAsset(downloadURL);
          setLoading(false);
          setFields(true);
          setMsg('Image uploaded successfully');
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    )
  };
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("Success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  };
  const saveDetails = () => {
    setLoading(true);
    try {
      if(!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      } else {
        const data = {
          id: Date.now(),
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }
        saveItem(data);
        setLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
        fetchData();
      }
    } catch(error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading : Try Again');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col gap-4 items-center justify-center  '>
        {
          fields && (
            <motion.p
              initial={{ opacity : 0 }}
              animate={{ opacity : 1 }}
              exit={{ opacity : 0 }}
              className={`p-2 w-full rounded-lg text-center text-lg font-semibold 
              ${alertStatus === "danger" ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`}
            >
              {msg}
            </motion.p>
          )
        }

        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-xl text-gray-700' />
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter the title...'
            className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'
          />
        </div>

        <div className='w-full'>
          <select
            className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer' 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className='bg-white'>Select Category</option>
            {
              categories.map((category) => {
                return (
                  <option 
                    key={category.id} 
                    value={category.urlParamName}
                    className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                  >
                    {category.name}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
          {loading 
            ? <Loader /> 
            : (
                <>
                  {
                    !imageAsset
                    ? (
                      <label className='flex w-full h-full items-center justify-center cursor-pointer'>
                        <div className='flex flex-col w-full h-full items-center justify-center gap-2'>
                          <MdCloudUpload className='text-3xl text-gray-500 hover:text-gray-700' />
                          <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
                        </div>
                        <input 
                          type="file" 
                          name="uploadImage" 
                          accept='image/*'
                          onChange={uploadImage}
                          className='w-0 h-0' 
                        />
                      </label>
                    ) 
                    : (
                      <>
                        <div className='relative h-full'>
                          <img 
                            src={imageAsset}
                            alt="uploadedImage"
                            className='w-full h-full object-cover' 
                          />
                          <button 
                            type="button"
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                            onClick={deleteImage}
                          >
                            <MdDelete className='text-white' />
                          </button>
                        </div>
                      </>
                    )
                  }
                </>
              )
          }
        </div>
        <div className='flex flex-col md:flex-row items-center gap-3 w-full'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='text-gray-700 text-2xl' />
            <input 
              type='text' 
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)} 
              placeholder='Calories'
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 font-semibold text-textColor'
            />
          </div>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-gray-700 text-2xl' />
            <input 
              type='text' 
              required 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price'
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 font-semibold text-textColor'
            />
          </div>
        </div>

        <div className='flex items-center w-full'>
          <button
            type='button'
            className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateContainer
