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
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Simulate fetching data from a JSON file or API
    const fetchData = async () => {
      const response = await fetch("/data/performanceData.json"); // Make sure this file exists
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    const order = key === sortBy && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortOrder(order);
    const sorted = [...data].sort((a, b) => {
      if (order === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setData(sorted);
  };

  const getCTR = (clicks, impressions) => {
    return impressions === 0 ? 0 : ((clicks / impressions) * 100).toFixed(2);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        SEO Scientist Performance Data
      </h1>
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
            {data.map((item, idx) => (
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
      <p className="text-sm text-gray-500 mt-4">
        CTR is calculated as (Clicks / Impressions) × 100.
      </p>
    </div>
  );
};

export default PerformanceTable;
