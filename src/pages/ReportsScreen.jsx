import { useState } from "react";
import Loading from "../components/Loading";
import ReportsTable from "../components/ReportsTable"; 
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import ItemsPerPage from "../components/ItemsPerPage";
import useFetchAllReportsData from "../hooks/useFetchReportsData";

export default function ReportsScreen() {
  const { loading, reports } = useFetchAllReportsData();

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredReports = reports.filter((report) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return Object.values(report).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchLowerCase)
        : false
    );
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="mb-4 text-3xl font-semibold">Reports Page</h1>
          <form className="mb-4">
            <Searchbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </form>
          <ReportsTable reports={currentReports} />
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
