import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

const useFetchDriverData = ({ id }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(true);

        const driverDocRef = doc(db, 'drivers', id);
        const driverDocSnapshot = await getDoc(driverDocRef);

        if (driverDocSnapshot.exists()) {
          const fetchedDriverData = driverDocSnapshot.data();
          setDriver(fetchedDriverData);
        } else {
          console.log('Driver document does not exist');
        }
      } catch (error) {
        console.error('Error fetching driver data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [id]);

  return { driver, loading };
};

export default useFetchDriverData;
