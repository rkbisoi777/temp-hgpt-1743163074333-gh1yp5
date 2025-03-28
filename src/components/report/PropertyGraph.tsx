// // import React from 'react';
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend
// // } from 'recharts';

// // interface PriceData {
// //   monthYear: string;
// //   propertyPrice: number;
// //   localityAvgPrice: number;
// //   cityAvgPrice: number;
// // }

// // interface PriceTrendGraphProps {
// //   data: PriceData[];
// //   propertyId: string;
// // }

// // const formatPrice = (value: number) => {
// //   if (value >= 10000) {
// //     return `₹${(value / 1000).toFixed(1)}K`;
// //   }
// //   return `₹${value}`;
// // };

// // const CustomTooltip = ({ active, payload, label }: any) => {
// //   if (active && payload && payload.length) {
// //     return (
// //       <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
// //         <p className="font-semibold mb-2">{label}</p>
// //         {payload.map((entry: any, index: number) => (
// //           <div key={index} className="flex items-center gap-2">
// //             <div
// //               className="w-3 h-3 rounded-full"
// //               style={{ backgroundColor: entry.color }}
// //             />
// //             <span className="text-sm">
// //               {entry.name === 'propertyPrice'
// //                 ? 'Property Price'
// //                 : entry.name === 'localityAvgPrice'
// //                 ? 'Locality Average'
// //                 : 'City Average'}
// //               : {formatPrice(entry.value)}/sq.ft
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }
// //   return null;
// // };

// // export const PropertyGraph: React.FC<PriceTrendGraphProps> = ({ data }) => {
  
// //   return (
// //     <div className="rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden p-3 mt-4 w-full h-[500px]">
// //       <h2 className="text-lg font-semibold mb-4">Price Trend Analysis</h2>
// //       <ResponsiveContainer width="100%" height="100%">
// //         <LineChart
// //           data={data}
// //           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
// //           <XAxis
// //             dataKey="monthYear"
// //             tick={{ fontSize: 12 }}
// //             angle={-45}
// //             textAnchor="end"
// //             height={60}
// //           />
// //           <YAxis
// //             tickFormatter={formatPrice}
// //             tick={{ fontSize: 12 }}
// //             width={80}
// //           />
// //           <Tooltip content={<CustomTooltip />} />
// //           <Legend
// //             verticalAlign="top"
// //             height={36}
// //             formatter={(value) =>
// //               value === 'propertyPrice'
// //                 ? 'Property Price'
// //                 : value === 'localityAvgPrice'
// //                 ? 'Locality Average'
// //                 : 'City Average'
// //             }
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="propertyPrice"
// //             stroke="#2563eb"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //             activeDot={{ r: 6 }}
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="localityAvgPrice"
// //             stroke="#16a34a"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //             activeDot={{ r: 6 }}
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="cityAvgPrice"
// //             stroke="#dc2626"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //             activeDot={{ r: 6 }}
// //           />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };


// import React from 'react';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from 'recharts';

// interface PriceData {
//   monthYear: string;
//   propertyPrice: number;
//   localityAvgPrice: number;
//   cityAvgPrice: number;
// }

// interface PriceTrendGraphProps {
//   data: PriceData[];
//   propertyId: string;
// }

// const formatPrice = (value: number) => {
//   if (value >= 10000) {
//     return `₹${(value / 1000).toFixed(1)}K`;
//   }
//   return `₹${value}`;
// };

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
//         <p className="font-semibold mb-2">{label}</p>
//         {payload.map((entry: any, index: number) => (
//           <div key={index} className="flex items-center gap-2 mb-1">
//             <div
//               className="w-3 h-3 rounded-full"
//               style={{ backgroundColor: entry.color }}
//             />
//             <span className="text-sm font-medium">
//               {entry.name === 'propertyPrice'
//                 ? 'Property Price'
//                 : entry.name === 'localityAvgPrice'
//                 ? 'Locality Average'
//                 : 'City Average'}
//               : <span className="font-semibold">{formatPrice(entry.value)}/sq.ft</span>
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// export const PropertyGraph: React.FC<PriceTrendGraphProps> = ({ data }) => {
//   return (
//     <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6 mt-4 w-full h-[400px] md:h-[500px] pb-12">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-800">Price Trend Analysis</h2>
//         <div className="flex items-center gap-6 mt-2 md:mt-0 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-full bg-blue-600" />
//             <span>Property Price</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-full bg-green-600" />
//             <span>Locality Avg</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-full bg-red-600" />
//             <span>City Avg</span>
//           </div>
//         </div>
//       </div>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={data}
//           margin={{ top: 5, right: 10, left: 10, bottom: 30 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//           <XAxis
//             dataKey="monthYear"
//             tick={{ fontSize: 12 }}
//             angle={-45}
//             textAnchor="end"
//             height={60}
//             tickMargin={10}
//           />
//           <YAxis
//             tickFormatter={formatPrice}
//             tick={{ fontSize: 12 }}
//             width={60}
//             tickMargin={5}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Line
//             type="monotone"
//             dataKey="propertyPrice"
//             stroke="#2563eb"
//             strokeWidth={2.5}
//             dot={{ r: 3, strokeWidth: 2 }}
//             activeDot={{ r: 6 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="localityAvgPrice"
//             stroke="#16a34a"
//             strokeWidth={2}
//             dot={{ r: 3, strokeWidth: 1.5 }}
//             activeDot={{ r: 5 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="cityAvgPrice"
//             stroke="#dc2626"
//             strokeWidth={2}
//             dot={{ r: 3, strokeWidth: 1.5 }}
//             activeDot={{ r: 5 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };


import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface PriceData {
  monthYear: string;
  propertyPrice: number;
  localityAvgPrice: number;
  cityAvgPrice: number;
}

interface PriceTrendGraphProps {
  data: PriceData[];
  propertyId: string;
}

const formatPrice = (value: number) => {
  if (value >= 10000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">
              {entry.name === 'propertyPrice'
                ? 'Property Price'
                : entry.name === 'localityAvgPrice'
                ? 'Locality Average'
                : 'City Average'}
              : <span className="font-semibold">{formatPrice(entry.value)}/sq.ft</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const PropertyGraph: React.FC<PriceTrendGraphProps> = ({ data }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-lg py-2 px-4 mt-4 w-full h-[400px] md:h-[500px] md:pb-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Price Trend Analysis</h2>
        <div className="flex items-center gap-6 mt-2 md:mt-0 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span>Property Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span>Locality Avg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span>City Avg</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" className={`-ml-8`}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 25, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="monthYear"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
            tickMargin={10}
          />
          <YAxis
            tickFormatter={formatPrice}
            tick={{ fontSize: 11 }}
            width={70}
            tickMargin={10}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="propertyPrice"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="localityAvgPrice"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="cityAvgPrice"
            stroke="#dc2626"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};