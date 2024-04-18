import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useFetchAllReportsData = (selectedMonth) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const reportsCollection = collection(db, 'reports');
      const querySnapshot = await getDocs(reportsCollection);
  
      const reportsData = [];
      querySnapshot.forEach((doc) => {
        const reportData = doc.data();
        const id = doc.id;
        const createdAt = new Date(); 
        reportsData.push({ id, ...reportData, createdAt });
      });
  
      setReports(reportsData);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchReports();
  }, []); 

  return { loading, reports, fetchReports };
}

export default useFetchAllReportsData;