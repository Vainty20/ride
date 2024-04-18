import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

const useFetchBookData = ({ id }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);

        const bookDocRef = doc(db, 'book', id);
        const bookDocSnapshot = await getDoc(bookDocRef);

        if (bookDocSnapshot.exists()) {
          const fetchedBookData = bookDocSnapshot.data();
          setBook(fetchedBookData);
        } else {
          console.log('Book document does not exist');
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  return { book, loading };
};

export default useFetchBookData;
