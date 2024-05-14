import { useState } from "react";
import Loading from "../components/Loading";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import useFetchAllBooksData from "../hooks/useFetchAllBooksData";
import BookTable from "../components/BookTable";

export default function BooksScreen() {
  const { books, loading, fetchBooks } = useFetchAllBooksData();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return Object.values(book).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchLowerCase)
        : false
    );
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleDeleteBooks = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Book?"
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "book", bookId));
        alert("Deleted Successfully!");
        fetchBooks();
      } catch (error) {
        alert("Error deleting Book:", error);
      }
    }
  };
  return (
    <div className="w-full p-6 overflow-hidden">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="mb-4 text-3xl font-semibold">Bookings Page</h1>
          <form className="mb-4">
            <Searchbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </form>
          <div className="overflow-auto">
          <BookTable books={currentBooks} handleDelete={handleDeleteBooks} />
          </div>
          <div className="flex flex-wrap items-center justify-between py-2">
            <ItemsPerPage
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
