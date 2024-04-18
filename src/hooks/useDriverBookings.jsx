import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useDriverBookings = ({ id }) => {
  const [driverBookings, setDriverBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverBookings = async () => {
      try {
        const bookingsCollection = collection(db, "book");
        const driverBookingsQuery = query(
          bookingsCollection,
          where("driverId", "==", id)
        );
        const driverBookingsSnapshot = await getDocs(driverBookingsQuery);
        const driverBookingsData = driverBookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDriverBookings(driverBookingsData.reverse());
      } catch (error) {
        console.error("Error fetching driver bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverBookings();
  }, [id]);

  return { driverBookings, loading };
};

export default useDriverBookings;
