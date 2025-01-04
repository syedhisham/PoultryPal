import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest'; 
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import '@fontsource/poppins';
import { Card, Typography } from '@material-tailwind/react';

const FlockDataGraph = () => {
  const [flocks, setFlocks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const token = useSelector(selectToken) || localStorage.getItem('token');

  useEffect(() => {
    const fetchFlocks = async () => {
      try {
        const response = await AxiosRequest.get('/api/flock/flocks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.flocks)) {
          const flocksData = response.data.flocks;
          setFlocks(flocksData);
          formatChartData(flocksData);
        } else {
          console.error('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching flocks data:', error);
      }
    };

    fetchFlocks();
  }, [token]);

  const formatChartData = (flocks) => {
    if (!Array.isArray(flocks)) {
      console.error('Invalid data format in formatChartData:', flocks);
      setChartData([]);
      return;
    }

    const formattedData = flocks.map(flock => ({
      name: flock.name,
      size: flock.size,
    }));

    setChartData(formattedData);
  };

  return (
    <div className="min-h-screen bg-[#f0ebe4] font-poppins">
      <div className="p-6 max-w-5xl mx-auto">
      <Card className="p-8 min-w-screen shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
      <Typography variant="h4" className="mb-6 text-black text-center font-semibold">
            Flock Data Overview
          </Typography>

          {/* Table Display */}
          <div className="overflow-x-auto mb-6 dashboard-2-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age (Weeks)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Health Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Managed By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price per Bird</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {flocks.length > 0 ? (
                  flocks.map((flock) => (
                    <tr key={flock._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.ageInWeeks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.healthStatus}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {flock.managedBy.firstName} {flock.managedBy.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{flock.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Chart Display */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Typography variant="h5" className="mb-4 text-black text-center font-semibold">
              Flock Sizes
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="size" stroke="#f56565" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlockDataGraph;
