import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setGenre(response.data.genre);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      genre,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      {loading ? <Spinner /> : ''}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-lg p-10 bg-blue-500 mx-auto my-40'>
      <h1 className='text-3xl my-4 text-white text-center ont-bold'>EDIT THE DETAILS:</h1>

        <div className='my-4'>
        <label className='text-xl mr-4 text-white font-bold'>Title</label>
        <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-white-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
        <label className='text-xl mr-4 text-white font-bold'>Author</label>
        <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '/>
        </div>

        <div className='my-4'>
        <label className='text-xl mr-4 text-white font-bold'>Genre</label>
        <input
            type='text'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '/>
        </div>

        <div className='my-4'>
        <label className='text-xl mr-4 text-white font-bold'>Publish Year</label>
        <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '/>
        </div>

        <button className='p-2 bg-black m-8 text-white font-bold' onClick={handleEditBook}>
  Save
</button>

      </div>
    </div>
  )
}

export default EditBook