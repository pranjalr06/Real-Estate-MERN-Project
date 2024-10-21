import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';


const Profile = () => {

  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined) //for managing the file
  const [filePerc, setFilePrec] = useState(0) //for showing file %
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});  //for managing/updating the the form data 


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;  //for getting the first file
    const storageRef = ref(storage, fileName);
    const uplaodTask = uploadBytesResumable(storageRef, file);

    //to show the file uploading % -
    uplaodTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePrec(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then
          ((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          });
      }
    );
  };
  //firebase storage(in storage folder ) -
  /* 
     allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
  */



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        <span className='bg-slate-200 p-1 rounded-xl shadow-md'>Profile</span>
      </h1>
      <form className='flex flex-col gap-4 border border-black p-2'>

        <input type="file" ref={fileRef}
          hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type="text" placeholder='username' id='username'
          className='border p-3 rounded-lg' />

        <input type="email" placeholder='email' id='email'
          className='border p-3 rounded-lg' />

        <input type="password" placeholder='password' id='password'
          className='border p-3 rounded-lg' />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95
        disabled:opacity-80'>update</button>

        <div className='flex justify-between  p-2'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  )
}

export default Profile
