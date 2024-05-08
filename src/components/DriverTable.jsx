import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import sendEmail from "../utils/sendEmail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DriverTable({ drivers, handleApproved }) {
  const location = useLocation();
  const [selectedDates, setSelectedDates] = useState({});

  const categories = [
    { title: "Profile Pic" },
    { title: "First Name" },
    { title: "Last Name" },
    { title: "Contact Number" },
    { title: "Motorcycle Model" },
    { title: "Motorcycle Reg No." },
    { title: "Motorcycle Max Load" },
    { title: "isApprovedDriver" },
  ];

  const sendSchedule = async (email) => {
    try {
      const selectedDate = selectedDates[email];
      if (!selectedDate) {
        alert("Please select a date");
        return;
      }

      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        alert("Please select a future date");
        return;
      }
      await sendEmail({
        to_email: email,
        subject: "Ridemoto Driver's Schedule",
        message: `Hello there, your evaluation appointment is set for ${selectedDate.toLocaleDateString()}. Please bring:
        1. Completed application form
        2. Driver's license
        3. Motorcycle for assessment
        
        Arrive 15 mins early for paperwork.
        
        Looking forward to meeting you.`,
      });
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleDateChange = (date, email) => {
    setSelectedDates({ ...selectedDates, [email]: date });
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg">
        <thead>
          <tr>
            {categories.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.title}
              </th>
            ))}
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td className="flex justify-center items-centerpx-6 py-4 whitespace-nowrap">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={
                    driver.profilePicture
                      ? driver.profilePicture
                      : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                  }
                  alt={`Profile of ${driver.firstName} ${driver.lastName}`}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{driver.firstName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{driver.lastName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {driver.phoneNumber}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {driver.motorcycleModel}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {driver.motorcycleRegNo}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{driver.maxLoad} kg</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {driver.isApprovedDriver ? "true" : "false"}
                </div>
              </td>
              <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
                {location.pathname === "/home/drivers" && (
                  <>
                    <Link
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      to={`/home/driver/${driver.id}`}
                    >
                      View
                    </Link>
                    <button
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleApproved(driver.id)}
                    >
                      {driver.isApprovedDriver ? "Disable" : "Approve"}
                    </button>
                  </>
                )}
                {location.pathname === "/home/schedules" &&
                !driver.isApprovedDriver ? (
                  <>
                    <Link
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      to={`/home/driver/${driver.id}`}
                    >
                      View
                    </Link>
                    <DatePicker
                      selected={selectedDates[driver.email]}
                      onChange={(date) => handleDateChange(date, driver.email)}
                      minDate={new Date()}
                      placeholderText="Select a future date"
                      className="text-black"
                    />
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => sendSchedule(driver.email)}
                    >
                      Send Schedule
                    </button>
                  </>
                ) : (
                  <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    to={`/home/driver/${driver.id}`}
                  >
                    View
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
