import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AxiosRequest } from '../../../../AxiosRequest/AxiosRequest'; 
import { useSelector } from 'react-redux';
import { selectToken } from '../../../../redux/tokenSlice';
import '@fontsource/poppins';
import { Card, Typography } from '@material-tailwind/react';

const FeedDataGraph = () => {
  const [feeds, setFeeds] = useState([]);
  const [chartData, setChartData] = useState([]);
  const token = useSelector(selectToken) || localStorage.getItem('token');

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await AxiosRequest.get('/api/feed/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.feeds)) {
          const feedData = response.data.feeds;
          setFeeds(feedData);
          formatChartData(feedData);
        } else {
          console.error('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }
    };

    fetchFeeds();
  }, [token]);

  const formatChartData = (feeds) => {
    if (!Array.isArray(feeds)) {
      console.error('Invalid data format in formatChartData:', feeds);
      setChartData([]);
      return;
    }

    const formattedData = feeds.map(feed => ({
      feedType: feed.feedType,
      quantityInKGs: Number(feed.quantity),  // Assuming feed quantity is measured in tons
    }));

    setChartData(formattedData);
  };

  return (
    <div className="min-h-screen bg-[#f0ebe4] font-poppins">
      <div className="p-6 max-w-5xl mx-auto">
        <Card className="p-8 min-w-screen shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
          <Typography variant="h4" className="mb-6 text-black text-center font-semibold">
            Feed Data Overview
          </Typography>

          {/* Table Display with Horizontal Scrolling */}
          <div className="overflow-x-auto mb-6 dashboard-2-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type of Feed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity in KGs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Measurement Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Feed Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price per KG</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Prev Order Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Next Order Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Managed By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeds.length > 0 ? (
                  feeds.map((feed) => (
                    <tr key={feed._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{feed.feedType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{feed.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{feed.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{feed.supplier}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{feed.price} per {feed.perUnit} KG</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(feed.lastOrderDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(feed.nextOrderDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {feed.managedBy ? `${feed.managedBy.firstName} ${feed.managedBy.lastName}` : 'N/A'}
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
              Feed Quantities (in KGs)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="feedType" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'KGs', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantityInKGs" stroke="#f56565" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeedDataGraph;
