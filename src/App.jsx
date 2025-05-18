import React, { useEffect, useState } from "react";

const PerformanceTable = () => {
  const [data, setData] = useState([
    {
      date: "2025-05-01",
      position: 3.2,
      traffic: 120,
      impressions: 900,
      clicks: 50,
    },
    {
      date: "2025-05-02",
      position: 2.8,
      traffic: 140,
      impressions: 1000,
      clicks: 60,
    },
    {
      date: "2025-05-03",
      position: 4.1,
      traffic: 100,
      impressions: 850,
      clicks: 40,
    },
    {
      date: "2025-05-04",
      position: 2.4,
      traffic: 180,
      impressions: 1100,
      clicks: 70,
    },
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/performanceData.json");
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    const order = key === sortBy && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortOrder(order);
    const sorted = [...filteredData].sort((a, b) => {
      if (order === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setFilteredData(sorted);
  };

  const getCTR = (clicks, impressions) => {
    return impressions === 0 ? 0 : ((clicks / impressions) * 100).toFixed(2);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setFilteredData(data);
    } else if (value === "clicks>50") {
      setFilteredData(data.filter((item) => item.clicks > 50));
    } else if (value === "dateRecent") {
      setFilteredData(
        [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Position",
      "Traffic",
      "Impressions",
      "Clicks",
      "CTR",
    ];
    const rows = filteredData.map((item) => [
      item.date,
      item.position,
      item.traffic,
      item.impressions,
      item.clicks,
      getCTR(item.clicks, item.impressions) + "%",
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "performance_data.csv");
    link.click();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        SEO Scientist Performance Data
      </h1>

      <div className="flex justify-between mb-4">
        <select onChange={handleFilter} className="p-2 border rounded">
          <option value="all">All Data</option>
          <option value="clicks>50">Clicks {`>`} 50</option>
          <option value="dateRecent">Most Recent Dates</option>
        </select>
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
              {[
                "date",
                "position",
                "traffic",
                "impressions",
                "clicks",
                "ctr",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-6 cursor-pointer hover:text-blue-600"
                  onClick={() =>
                    handleSort(header === "ctr" ? "clicks" : header)
                  }
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {currentRows.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{item.date}</td>
                <td className="py-3 px-6">{item.position}</td>
                <td className="py-3 px-6">{item.traffic}</td>
                <td className="py-3 px-6">{item.impressions}</td>
                <td className="py-3 px-6">{item.clicks}</td>
                <td className="py-3 px-6">
                  {getCTR(item.clicks, item.impressions)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        CTR is calculated as (Clicks / Impressions) × 100.
      </p>
    </div>
  );
};

export default PerformanceTable;
