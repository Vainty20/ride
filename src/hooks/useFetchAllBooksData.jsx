import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useFetchAllBooksData = (selectedMonth) => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "book");
      let booksQuery = query(booksCollection);

      if (selectedMonth) {
        const startOfMonth = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth(),
          1
        );
        const endOfMonth = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth() + 1,
          0
        );
        booksQuery = query(
          booksCollection,
          where("createdAt", ">=", startOfMonth),
          where("createdAt", "<=", endOfMonth)
        );
      }

      const querySnapshot = await getDocs(booksQuery);

      const booksData = [];
      querySnapshot.forEach((doc) => {
        const bookData = doc.data();
        const id = doc.id;
        const createdAt = bookData.createdAt
          ? bookData.createdAt.toDate()
          : null;
        booksData.push({ id, ...bookData, createdAt });
      });

      setBooks(booksData.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [selectedMonth]);

  return { loading, books, fetchBooks };
};

export default useFetchAllBooksData;
