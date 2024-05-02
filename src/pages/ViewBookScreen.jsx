import { useParams } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import useFetchBookData from "../hooks/useFetchBookData";
import Loading from "../components/Loading";
import MapComponent from "../components/MapComponent";
import useFetchDriverData from "../hooks/useFetchDriverData";

const formatDate = (timestamp) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Date(timestamp).toLocaleString("en-US", options);
  return formattedDate;
};

export default function ViewBookScreen() {
  const { id } = useParams();
  const { book, loading: bookLoading } = useFetchBookData({ id });
  const { driver, loading: driverLoading } = useFetchDriverData({ id: book?.driverId });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_1DfvG_eN5x0NYjLkm3aPRsm7sYk0Dz8",
  });

  return (
    <div className="w-full p-6">
      {bookLoading && driverLoading ? (
        <Loading />
      ) : book ? (
        <div>
          <MapComponent
            pickupCoords={book.pickupCoords}
            dropoffCoords={book.dropoffCoords}
            isLoaded={isLoaded}
          />
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-2">{book.pickupLocation}</h1>
            <h2 className="text-xl font-semibold mb-2">
              {book.dropoffLocation}
            </h2>
            <p className="text-white mb-2">
              {driver && `Drived by ${driver.firstName} ${driver.lastName}`}
            </p>
            <p className="text-white mb-2">
              Booked by {book.userfirstName} {book.userlastName}
            </p>
            <p className="text-white">At {formatDate(book.timestamp)}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Book not found</p>
      )}
    </div>
  );
}
