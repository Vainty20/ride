import { useState } from "react";
import Loading from "../components/Loading";
import useFetchAllDriversData from "../hooks/useFetchAllDriversData";
import DriverTable from "../components/DriverTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc, addDoc, collection } from "firebase/firestore";

export default function DriversScreen() {
  const { drivers, loading, fetchDrivers } = useFetchAllDriversData();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [newMotor, setNewMotor] = useState(""); // State for new motor input

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleMotorChange = (event) => {
    setNewMotor(event.target.value);
  };

  const handleAddMotor = async () => {
    if (newMotor.trim() === "") {
      alert("Motor name cannot be empty.");
      return;
    }

    try {
      const motorsCollectionRef = collection(db, "motors");
      await addDoc(motorsCollectionRef, { name: newMotor });
      alert("Motor added successfully!");
      setNewMotor("");
      // If needed, fetch motors or update state here
    } catch (error) {
      alert("Error adding motor: ", error);
    }
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
          <div className="flex justify-between">
            <h1 className="mb-4 text-3xl font-semibold">Drivers Page</h1>
            <div>
              <input
                type="text"
                value={newMotor}
                onChange={handleMotorChange}
                placeholder="Enter new motor name"
                className="border p-2 mr-2 rounded text-gray-700"
              />
              <button
                onClick={handleAddMotor}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add Motor
              </button>
            </div>
          </div>
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
