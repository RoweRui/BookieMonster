import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (

        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full max-w-lg p-10 bg-blue-500 mx-auto my-40'>
        <h1 className='text-3xl my-4 text-white text-center ont-bold'>BOOK DETAILS:</h1>

        <div className='my-4'>
        <span className='text-xl mr-4 text-white font-bold'>Book ID:</span>
        <span className='text-black'>{book._id}</span>
        </div>

  
          <div className='my-4'>
            <span className='text-xl mr-4 text-white font-bold'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-white font-bold'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-white font-bold'>Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-white font-bold'>Creation Time:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-white font-bold'>Last Update Time:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
