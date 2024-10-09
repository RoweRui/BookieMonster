import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black w-full p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <img src="logo1.png" alt="BookieMonster" className="text-white text-xl" style={{ width: '200px', height: '50px' }} />
        <div className="flex gap-x-2">
          <button
            className="bg-white hover:bg-red-600 px-4 py-1 rounded-lg hover:text-white"
            onClick={() => setShowType('table')}
>
            Table
          </button>

          <button
            className="bg-white hover:bg-red-600 px-4 py-1 rounded-lg hover:text-white"
            onClick={() => setShowType('card')}
          >
            Card
          </button>
        </div>
      </header>

      <main className="pt-24 flex-grow bg-white text-black"> 
      <div className="flex justify-between items-center my-4">
          <Link to="/books/create">
            <div className="flex items-center bg-red-500 p-2 rounded-full">
              <MdOutlineAddBox className="text-white text-4xl mr-2" />
              <span className="text-white">Add A New Book</span>
            </div>
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </main>

      <footer className="bg-black text-white py-6 mt-4"> {/* Add mt-4 or adjust as needed */}
  <div className="container mx-auto text-center">
    <p>&copy; {new Date().getFullYear()} BookieMonster. All rights reserved.</p>
    <div className="flex justify-center space-x-5">
      <a href="#" className="hover:text-red-600">Privacy Policy</a>
      <a href="#" className="hover:text-red-600">Terms of Service</a>
      <a href="#" className="hover:text-red-600">Contact Us</a>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Home;
