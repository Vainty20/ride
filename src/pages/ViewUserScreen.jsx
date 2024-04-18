import { useParams } from "react-router-dom";
import useFetchUserData from "../hooks/useFetchUserData";
import Loading from "../components/Loading";
import useUserBookings from "../hooks/useUserBookings";
import BookingCard from "../components/BookCard";

export default function ViewUserScreen() {
  const { id } = useParams();
  const { user, loading: userLoading } = useFetchUserData({ id });
  const { userBookings, loading: bookLoading } = useUserBookings({ id });

  if (userLoading || bookLoading) return <Loading />;

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-[200px] mb-2">
        <img
          className="w-full h-40 object-cover"
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
          }
          alt={`Profile of ${user.firstName} ${user.lastName}`}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 mb-2">{user.phoneNumber}</p>
        </div>
      </div>
      {userBookings.length > 0 ? (
        userBookings.map((book) => <BookingCard key={book.id} booking={book} />)
      ) : (
        <p className="text-white">No bookings available.</p>
      )}
    </div>
  );
}
