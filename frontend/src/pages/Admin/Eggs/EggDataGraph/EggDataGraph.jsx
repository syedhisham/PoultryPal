import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest'; 
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import '@fontsource/poppins';
import { Card, Typography } from '@material-tailwind/react';

const EggDataGraph = () => {
  const [eggs, setEggs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const token = useSelector(selectToken) || localStorage.getItem('token');

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const response = await AxiosRequest.get('/api/eggs/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          const eggsData = response.data;
          setEggs(eggsData);
          formatChartData(eggsData);
        } else {
          console.error('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching eggs data:', error);
      }
    };

    fetchEggs();
  }, [token]);

  const formatChartData = (eggs) => {
    if (!Array.isArray(eggs)) {
      console.error('Invalid data format in formatChartData:', eggs);
      setChartData([]);
      return;
    }

    const formattedData = eggs.map(egg => ({
      eggType: egg.eggType,
      quantityInDozens: Number(egg.quantity),  // Convert quantity to dozens
    }));

    setChartData(formattedData);
  };

  return (
    <div className="min-h-screen bg-[#f0ebe4] font-poppins">
      <div className="p-6 max-w-5xl mx-auto">
        <Card className="p-8 min-w-screen shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
          <Typography variant="h4" className="mb-6 text-black text-center font-semibold">
            Egg Data Overview
          </Typography>

          {/* Table Display */}
          <div className="overflow-x-auto mb-6 dashboard-2-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Egg Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price per Dozen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Production Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Managed By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eggs.length > 0 ? (
                  eggs.map((egg) => (
                    <tr key={egg._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{egg.eggType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{egg.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{egg.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{egg.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{egg.pricePerDozen}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(egg.productionDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(egg.expiryDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {egg.managedBy ? `${egg.managedBy.firstName} ${egg.managedBy.lastName}` : 'N/A'}
                      </td>
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

          {/* Line Chart Display */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Typography variant="h5" className="mb-4 text-black text-center font-semibold">
              Egg Quantities (in Dozens)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eggType" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Dozens', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantityInDozens" stroke="#f56565" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EggDataGraph;
