const Dashboard = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-gray-600 text-2xl mt-2">120</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold">Total Bookings</h2>
          <p className="text-gray-600 text-2xl mt-2">85</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold">Active Models</h2>
          <p className="text-gray-600 text-2xl mt-2">12</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
