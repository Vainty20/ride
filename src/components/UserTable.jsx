import { Link } from "react-router-dom";

export default function UserTable({ users, handleApproved }) {
  const categories = [
    { title: "Profile Pic" },
    { title: "First Name" },
    { title: "Last Name" },
    { title: "Contact Number" },
    { title: "Address" },
    { title: "Status" },
  ];

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
        {users.map((user, index) => (
          <tr key={user.id}>
            <td className="flex justify-center items-centerpx-6 py-4 whitespace-nowrap">
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                }
                alt={`Profile of ${user.firstName} ${user.lastName}`}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.firstName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.lastName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.phoneNumber}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{user.address}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {user.isApproved ? "Active" : "Disabled" }
              </div>
            </td>
            <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                to={`/home/user/${user.id}`}
              >
                View
              </Link>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleApproved(user.id)}
              >
                {user.isApproved ? "Disable": "Enable"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
