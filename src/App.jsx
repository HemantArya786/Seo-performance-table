import React from "react";

const seoData = [
  {
    date: "2025-04-15",
    position: 63.39,
    traffic: 0,
    impressions: 3075,
    clicks: 1,
    ctr: 0.0,
  },
  {
    date: "2025-04-16",
    position: 64.72,
    traffic: 0,
    impressions: 2455,
    clicks: 0,
    ctr: 0.0,
  },
  {
    date: "2025-04-17",
    position: 63.44,
    traffic: 0,
    impressions: 2633,
    clicks: 1,
    ctr: 0.0,
  },
  {
    date: "2025-04-18",
    position: 64.47,
    traffic: 0,
    impressions: 2358,
    clicks: 1,
    ctr: 0.0,
  },
  {
    date: "2025-04-19",
    position: 65.85,
    traffic: 0,
    impressions: 2169,
    clicks: 2,
    ctr: 0.0,
  },
  {
    date: "2025-04-20",
    position: 66.78,
    traffic: 0,
    impressions: 1983,
    clicks: 4,
    ctr: 0.0,
  },
  {
    date: "2025-04-21",
    position: 64.2,
    traffic: 0,
    impressions: 2320,
    clicks: 3,
    ctr: 0.0,
  },
  {
    date: "2025-04-22",
    position: 67.16,
    traffic: 0,
    impressions: 2986,
    clicks: 2,
    ctr: 0.0,
  },
  {
    date: "2025-04-23",
    position: 67.25,
    traffic: 0,
    impressions: 2389,
    clicks: 1,
    ctr: 0.0,
  },
];

export default function SEOTable() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        SEO Scientist Performance Data
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Position
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Traffic
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Impressions
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Clicks
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                CTR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {seoData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-sm text-gray-800">{row.date}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {row.position}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {row.traffic}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {row.impressions}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {row.clicks}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {row.impressions > 0
                    ? ((row.clicks / row.impressions) * 100).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
