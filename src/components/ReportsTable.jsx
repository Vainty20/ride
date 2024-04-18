export default function ReportsTable({ reports }) {
  const categories = [
    { title: "ID" },
    { title: "Name" },
    { title: "Category" },
    { title: "Description" },
    { title: "Reported By" },
    { title: "Date" }, // Added "Date" column
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
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {reports.map((report, index) => (
          <tr key={report.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{index + 1}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{report.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{report.category}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{report.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{report.reportedBy}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{report.createdAt ?  report.createdAt.toLocaleDateString() : 'N/A'}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
