export default function RecentDrivers({ drivers }) {
  return (
    <div className="bg-gray-200 p-2 rounded-lg w-full text-gray-900">
      <h1 className="text-2xl font-bold m-5">Recent Drivers: </h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Profile Picture</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Motorcycle Reg No.</th>
          </tr>
        </thead>
        <tbody>
          {drivers.slice(-5).reverse().map((driver, index) => (
            <tr key={index}>
              <td className="flex justify-center items-center px-4 py-2">
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
              <td className="px-4 py-2">{driver.firstName}</td>
              <td className="px-4 py-2">{driver.lastName}</td>
              <td className="px-4 py-2">{driver.phoneNumber}</td>
              <td className="px-4 py-2">{driver.motorcycleRegNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
