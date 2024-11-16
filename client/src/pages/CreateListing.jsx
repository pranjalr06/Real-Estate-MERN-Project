import React from 'react'
import {useState} from 'react';
import { ref, getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {

  const[ files, setFiles ] = useState([]);
  const [ formData, setFormData ] = useState({
    imageUrls: [],
  });
const [ imageUploadError, setImageUploadError] = useState(false);
const [ uploading, setUploading] = useState(false) //for the image loading effect

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = []; //we are going to upload more than 1 images so we gonna have more than 1 asynchronus behaviour


      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
      })
    }else {
      setImageUploadError("Image can only upload 6 images per listing")
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name   //for getting new name all the time
      const storageRef = ref (storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_chamged",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
        //5:58:15
      )
    });
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !==index),
    })
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <div>
            <form className='flex flex-col sm:flex-row gap-4'>
      {/*----------------------------left side-----------------------------------  */}
                <div className=' flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border border-neutral-400 p-3 rounded-lg' 
                    id='name' maxLength='62' minLength='10' required/>

                    <textarea type="text" placeholder='Description' className='border border-neutral-400 p-3 rounded-lg' 
                    id='description' required/>
                    
                    <input type="text" placeholder='Address' className='border border-neutral-400 p-3 rounded-lg' 
                    id='address' required/>

                    <div className='flex gap-6 flex-wrap'>
                      <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5 border  border-black' />
                        <span>Sell</span>
                      </div>

                      <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>Rent</span>
                      </div>

                      <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking Spot</span>
                      </div>

                      <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' />
                        <span>Furnished</span>
                      </div>

                      <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' />
                        <span>Offer</span>
                      </div>
                    </div>


                    <div className='flex flex-wrap gap-6'>
                      <div className='flex items-center gap-2 my-2'>
                        <input type="number" id='bedrooms' min='1' max='10' required 
                        className='p-3 border border-neutral-400 rounded-lg'/>
                        <p>Beds</p>
                      </div>

                      <div className='flex items-center gap-2 my-2'>
                        <input type="number" id='bathrooms' min='1' max='10' required 
                        className='p-3 border border-neutral-400 rounded-lg'/>
                        <p>Bathrooms</p>
                      </div>

                      <div className='flex items-center gap-2 my-2'>
                        <input type="number" id='regularPrice' min='1' max='10' required 
                        className='p-3 border border-neutral-400 rounded-lg'/>
                        <div className="flex flex-col items-center">
                        <p>Regular price</p>
                        <span className='text-xs'>(Rs / Month)</span>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 my-2'>
                        <input type="number" id='discountPrice' min='1' max='10' required 
                        className='p-3 border border-neutral-400 rounded-lg'/>
                        <div className="flex flex-col items-center">
                          <p>Discounted price</p>
                          <span className='text-xs'>(Rs / Month)</span>
                        </div>
                      </div>
                    </div>
                </div>
  {/*----------------------------right side-----------------------------------  */}
                <div className="flex flex-col flex-1 gap-4">
                  <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                  </p>
                  <div className="flex gap-4 ">
                    <input  onChange={(e) => setFiles(e.target.files)} className='p-3 border border-neutral-400 rounded w-full' type="file" id='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                    onClick={handleImageSubmit} type='button' disabled={uploading}> {uploading ? 'Uploading...' : 'Upload'} </button>
                  </div>
                    <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
                    {
                      formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className="flex justify-between p-3 border items-center">
                          <img src={url} alt="listing images"  className='w-20 h-20 object-contain rounded-lg'/>
                          <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-95'>Delete</button>
                        </div>
                      ))
                    }
                    <button className='p-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </div>
    </main>
  )
}

export default CreateListing
