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

export default function BookingCard({ booking }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 mb-4">
      <p className="text-gray-600 mb-2"><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
      <p className="text-gray-600 mb-2"><strong>Dropoff Location:</strong> {booking.dropoffLocation}</p>
      <p className="text-gray-600 mb-2"><strong>Ride Price:</strong> {booking.ridePrice}</p>
      <p className="text-gray-600 mb-2"><strong>Ride Distance:</strong> {booking.rideDistance}</p>
      <p className="text-gray-600"><strong>Date:</strong> {formatDate(booking.timestamp)}</p>
    </div>
  );
};