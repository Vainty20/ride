import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useFetchAllDriversData = (selectedMonth) => {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const driversCollection = collection(db, "drivers");
      let driversQuery = query(driversCollection);

      if (selectedMonth) {
        const startOfMonth = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth(),
          1
        );
        const endOfMonth = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth() + 1,
          0
        );
        driversQuery = query(
          driversCollection,
          where("createdAt", ">=", startOfMonth),
          where("createdAt", "<=", endOfMonth)
        );
      }

      const querySnapshot = await getDocs(driversQuery);

      const driversData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const id = doc.id;
        const createdAt = userData.createdAt
          ? userData.createdAt.toDate()
          : null;
        driversData.push({ id, ...userData, createdAt });
      });

      setDrivers(driversData.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [selectedMonth]);

  return { loading, drivers, fetchDrivers };
};

export default useFetchAllDriversData;
