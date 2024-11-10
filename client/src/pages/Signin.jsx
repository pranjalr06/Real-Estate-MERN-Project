import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux' //using this 'useDispatch' hook we can dispatch the function we have
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'
import './signup.css'
import OAuth from '../components/OAuth.jsx';


const Signin = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user);  // useSelector hook
  const navigate = useNavigate();
  const dispatch = useDispatch(); //initializing the hook

  const handleChange = (e) => {
    setFormData({
        ...formData,  //for keeping the past data and adding new changes
        [e.target.id]: e.target.value,
      });
  };
  // code to store the data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      const data = await res.json();  //to convert the response to json   
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch (error) {
      dispatch(signInFailure(error.message));
    }
  }


  return (
    <div className='background py-36 mt-2'>
      <div className='p-7 bg-gray-200 outline outline-offset-2 outline-slate-800 shadow-lg shadow-slate-700/100 max-w-lg mx-auto my-20 s rounded-xl flex flex-col justify-center align-center border '>
        <h1 className='text-3xl text-center font-semibold mb-7'>Sign In</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
          
          <input type="email" placeholder='email' id='email'
            className='border rounded-lg p-3 shadow-sm' onChange={handleChange} />

          <input type="password" placeholder='password' id='password'
            className='border rounded-lg p-3 shadow-sm' onChange={handleChange} />

          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth/>
        </form>

        <div className='flex gap-2 mt-5 mx-auto'>
          <p>Dont have an account?</p>
          <Link to={'/signup'}>
            <span className='text-blue-700'>Sign up</span>
          </Link>
        </div>
        {/* <span className='text-center'>{error && <p className='text-red-500 mt-5'>{error}</p>}</span> */}
        <p className='text-red-700 mt-3 text-center'>{error ? error : ''}</p>
      </div>
    </div>
  )
}

export default Signin
