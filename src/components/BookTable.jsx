import { Link } from "react-router-dom";

export default function BookTable({ books, handleDelete }) {
  const categories = [
    { title: "Name" },
    { title: "Date" },
    { title: "Pickup Location" },
    { title: "Dropoff Location" },
    { title: "Status" },
  ];

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

  return (
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
        {books.map((book, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {book.userfirstName} {book.userlastName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatDate(book.timestamp)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{book.pickupLocation}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {book.dropoffLocation}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {book.isDropoff
                  ? "Dropoff"
                  : book.isPickUp
                  ? "Pickup"
                  : book.driverId
                  ? "Confirmed"
                  : "Waiting"}{" "}
              </div>
            </td>
            <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                to={`/home/book/${book.id}`}
              >
                View
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
