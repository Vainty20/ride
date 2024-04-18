import { useState } from "react";
import Loading from "../components/Loading";
import useFetchAllUsersData from "../hooks/useFetchAllUsersData";
import UserTable from "../components/UserTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export default function UsersScreen() {
  const { users, loading, fetchUsers } = useFetchAllUsersData();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return Object.values(user).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchLowerCase)
        : false
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  
  const handleApproved = async (userId) => {
    const confirmAction = window.confirm(
      "Are you sure you want to perform this action?"
    );

    if (confirmAction) {
      try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        const currentIsApproved = userSnapshot.data().isApproved;
        const newIsApproved = !currentIsApproved;

        await updateDoc(userRef, { isApproved: newIsApproved });
        alert("Updated Successfully!");
        fetchUsers();
      } catch (error) {
        alert("Error updating user:", error);
      }
    }
  };
  
  return (
    <div className="w-full p-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="mb-4 text-3xl font-semibold">Users Page</h1>
          <form className="mb-4">
            <Searchbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </form>
          <UserTable users={currentUsers} handleApproved={handleApproved} />
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
