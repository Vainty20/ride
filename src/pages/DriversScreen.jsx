import { useState } from "react";
import Loading from "../components/Loading";
import useFetchAllDriversData from "../hooks/useFetchAllDriversData";
import DriverTable from "../components/DriverTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export default function DriversScreen() {
  const { drivers, loading, fetchDrivers } = useFetchAllDriversData();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredDrivers = drivers.filter((driver) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return Object.values(driver).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchLowerCase)
        : false
    );
  });

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentDrivers = filteredDrivers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

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
        const driverRef = doc(db, "drivers", userId);
        const driverSnapshot = await getDoc(driverRef);
        const currentIsApproved = driverSnapshot.data().isApprovedDriver;
        const newIsApproved = !currentIsApproved;

        await updateDoc(driverRef, { isApprovedDriver: newIsApproved });
        alert("Updated Successfully!");
        fetchDrivers();
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
          <h1 className="mb-4 text-3xl font-semibold">Drivers Page</h1>
          <form className="mb-4">
            <Searchbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </form>
          <DriverTable
            drivers={currentDrivers}
            handleApproved={handleApproved}
          />
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
