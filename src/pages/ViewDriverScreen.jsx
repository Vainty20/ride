import { useParams } from "react-router-dom";
import useFetchDriverData from "../hooks/useFetchDriverData";
import Loading from "../components/Loading";
import useDriverBookings from "../hooks/useDriverBookings";
import BookingCard from "../components/BookCard";

export default function ViewDriverScreen() {
  const { id } = useParams();
  const { driver, loading: driverLoading } = useFetchDriverData({ id });
  const { driverBookings, loading: bookingLoading } = useDriverBookings({ id });

  if (driverLoading || bookingLoading) return <Loading />;

  return (
    <div className="p-6">
      {driver ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-[200px] mb-2">
          <img
            className="w-full h-40 object-cover"
            src={
              driver.profilePicture
                ? driver.profilePicture
                : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
            }
            alt={`Profile of ${driver.firstName} ${driver.lastName}`}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {driver.firstName} {driver.lastName}
            </h2>
            <p className="text-gray-600 mb-2">{driver.phoneNumber}</p>
          </div>
        </div>
      ) : (
        <p className="text-white">Driver not found</p>
      )}
      {driverBookings.length > 0 ? (
        <div>
          {driverBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p className="text-white">No bookings available for this driver.</p>
      )}
    </div>
  );
}
