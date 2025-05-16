// import React, { useEffect, useState } from "react";
// import API from "../utils/api";
// import dayjs from "dayjs";
// import { useNavigate,Link } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [morning, setMorning] = useState("");
//   const [evening, setEvening] = useState("");
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");

//   const fetchMonthly = async () => {
//     const year = dayjs().year();
//     const month = dayjs().month() + 1;
//     try {
//       const res = await API.get(`/milk/monthly?year=${year}&month=${month}`);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("Error fetching monthly data:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isNaN(morning) || isNaN(evening)) {
//       return setMessage("Please enter valid numbers");
//     }

//     try {
//       await API.post("/milk", {
//         date: selectedDate,
//         morning: parseFloat(morning),
//         evening: parseFloat(evening),
//       });
//       setMessage("Saved successfully ✅");
//       resetForm();
//       fetchMonthly();
//     } catch (err) {
//       console.error("Save error:", err.response?.data || err.message);
//       setMessage("Error saving record ❌");
//     }
//   };

//   const handleEdit = (record) => {
//     setSelectedDate(dayjs(record.date).format("YYYY-MM-DD"));
//     setMorning(record.morning);
//     setEvening(record.evening);
//     setEditingId(record._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/milk/${id}`);
//       setMessage("Deleted successfully 🗑️");
//       fetchMonthly();
//       resetForm();
//     } catch {
//       setMessage("Delete failed ❌");
//     }
//   };

//   const resetForm = () => {
//     setSelectedDate(dayjs().format("YYYY-MM-DD"));
//     setMorning("");
//     setEvening("");
//     setEditingId(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   useEffect(() => {
//     fetchMonthly();
//   }, []);
   
//   const [rangeStart, setRangeStart] = useState("");
// const [rangeEnd, setRangeEnd] = useState("");
// const [rate, setRate] = useState("");
// const [rangeResult, setRangeResult] = useState(null);

// const fetchRangeData = async () => {
//   if (!rangeStart || !rangeEnd || isNaN(rate)) {
//     setMessage("Please fill all fields correctly");
//     return;
//   }

//   try {
//     const res = await API.get(`/milk/range?start=${rangeStart}&end=${rangeEnd}`);
//     const totalMilk = res.data.reduce((sum, r) => sum + r.morning + r.evening, 0);
//     const totalPrice = totalMilk * parseFloat(rate);
//     setRangeResult({ totalMilk, totalPrice });
//   } catch (err) {
//     console.error("Range fetch error:", err);
//     setMessage("Failed to calculate milk range ❌");
//   }
// };



//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded mt-10">
//       <h1 className="text-2xl font-bold mb-4 text-center">🐄 Milk Record Dashboard</h1>
//        <div className="mt-6 text-center">
//   <Link to="/monthly-report" className="text-blue-600 underline">
//     📅 View Monthly Report
//   </Link>
// </div>
//       <div className="text-right mb-4">
//         <button onClick={handleLogout} className="text-sm text-red-500 underline">
//           Logout
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label>Date</label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label>Morning Milk (liters)</label>
//             <input
//               type="number"
//               value={morning}
//               onChange={(e) => setMorning(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//               step="0.1"
//             />
//           </div>
//           <div>
//             <label>Evening Milk (liters)</label>
//             <input
//               type="number"
//               value={evening}
//               onChange={(e) => setEvening(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//               step="0.1"
//             />
//           </div>
//         </div>

//         <div className="mt-4 font-medium">
//           Total Milk: {(parseFloat(morning || 0) + parseFloat(evening || 0)).toFixed(1)} liters
//         </div>

//         <div className="flex gap-4 mt-4">
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//             {editingId ? "Update Record" : "Save Record"}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={() => handleDelete(editingId)}
//               className="bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Delete Record
//             </button>
//           )}
//           {editingId && (
//             <button
//               type="button"
//               onClick={resetForm}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//         {message && <p className="mt-4 text-blue-600">{message}</p>}
//       </form>

//       <h2 className="text-lg font-bold mb-2">📅 This Month's Records</h2>
//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Morning</th>
//             <th className="border p-2">Evening</th>
//             <th className="border p-2">Total</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 && (
//             <tr>
//               <td colSpan="5" className="text-center p-4">
//                 No records for this month
//               </td>
//             </tr>
//           )}
//           {records.map((r) => (
//             <tr key={r._id}>
//               <td className="border p-2">{dayjs(r.date).format("YYYY-MM-DD")}</td>
//               <td className="border p-2">{r.morning}</td>
//               <td className="border p-2">{r.evening}</td>
//               <td className="border p-2">{r.morning + r.evening}</td>
//               <td className="border p-2">
//                 <button
//                   className="text-blue-600 underline"
//                   onClick={() => handleEdit(r)}
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>


//       {/* //new code */}
//             {/* Milk Range Report Section */}
//       <div className="mt-10 border-t pt-6">
//         <h2 className="text-lg font-bold mb-4">📊 Milk Range Report</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//           <div>
//             <label>From Date</label>
//             <input
//               type="date"
//               value={rangeStart}
//               onChange={(e) => setRangeStart(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label>To Date</label>
//             <input
//               type="date"
//               value={rangeEnd}
//               onChange={(e) => setRangeEnd(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label>Rate per Liter (₹)</label>
//             <input
//               type="number"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//               className="w-full p-2 border rounded"
//               step="0.1"
//             />
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={fetchRangeData}
//               className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//             >
//               Calculate
//             </button>
//           </div>
//         </div>

//         {rangeResult && (
//           <div className="mt-4 text-green-700 font-semibold">
//             <p>Total Milk: {rangeResult.totalMilk.toFixed(1)} liters</p>
//             <p>Total Earnings: ₹{rangeResult.totalPrice.toFixed(2)}</p>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Dashboard;







// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../utils/api";

// dayjs.extend(utc);
// dayjs.extend(timezone);

// const IST = "Asia/Kolkata";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [selectedDate, setSelectedDate] = useState(dayjs().tz(IST).format("YYYY-MM-DD"));
//   const [morning, setMorning] = useState("");
//   const [evening, setEvening] = useState("");
//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState("");

//   const [rangeStart, setRangeStart] = useState("");
//   const [rangeEnd, setRangeEnd] = useState("");
//   const [rate, setRate] = useState("");
//   const [rangeResult, setRangeResult] = useState(null);

//   const fetchMonthly = async () => {
//     const nowIST = dayjs().tz(IST);
//     const year = nowIST.year();
//     const month = nowIST.month() + 1;
//     try {
//       const res = await API.get(`/milk/monthly?year=${year}&month=${month}`);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("Error fetching monthly data:", err);
//     }
//   };

//   const resetForm = () => {
//     setSelectedDate(dayjs().tz(IST).format("YYYY-MM-DD"));
//     setMorning("");
//     setEvening("");
//     setEditingId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isNaN(morning) || isNaN(evening)) {
//       return setMessage("Please enter valid numbers");
//     }

//     try {
//       await API.post("/milk", {
//         date: selectedDate,
//         morning: parseFloat(morning),
//         evening: parseFloat(evening),
//       });
//       setMessage("Saved successfully ✅");
//       resetForm();
//       fetchMonthly();
//     } catch (err) {
//       console.error("Save error:", err.response?.data || err.message);
//       setMessage("Error saving record ❌");
//     }
//   };

//   const handleEdit = (record) => {
//     setSelectedDate(dayjs(record.date).tz(IST).format("YYYY-MM-DD"));
//     setMorning(record.morning);
//     setEvening(record.evening);
//     setEditingId(record._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/milk/${id}`);
//       setMessage("Deleted successfully 🗑️");
//       fetchMonthly();
//       resetForm();
//     } catch {
//       setMessage("Delete failed ❌");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const fetchRangeData = async () => {
//     if (!rangeStart || !rangeEnd || isNaN(rate)) {
//       setMessage("Please fill all fields correctly");
//       return;
//     }

//     try {
//       const res = await API.get(`/milk/range?start=${rangeStart}&end=${rangeEnd}`);
//       const totalMilk = res.data.reduce((sum, r) => sum + r.morning + r.evening, 0);
//       const totalPrice = totalMilk * parseFloat(rate);
//       setRangeResult({ totalMilk, totalPrice });
//     } catch (err) {
//       console.error("Range fetch error:", err);
//       setMessage("Failed to calculate milk range ❌");
//     }
//   };

//   useEffect(() => {
//     fetchMonthly();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded mt-10">
//       <h1 className="text-2xl font-bold mb-4 text-center">🐄 Milk Record Dashboard (IST)</h1>
//       <div className="mt-6 text-center">
//         <Link to="/monthly-report" className="text-blue-600 underline">
//           📅 View Monthly Report
//         </Link>
//       </div>
//       <div className="text-right mb-4">
//         <button onClick={handleLogout} className="text-sm text-red-500 underline">
//           Logout
//         </button>
//       </div>

//       {/* Entry Form */}
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label>Date</label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label>Morning Milk (liters)</label>
//             <input
//               type="number"
//               value={morning}
//               onChange={(e) => setMorning(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//               step="0.1"
//             />
//           </div>
//           <div>
//             <label>Evening Milk (liters)</label>
//             <input
//               type="number"
//               value={evening}
//               onChange={(e) => setEvening(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//               step="0.1"
//             />
//           </div>
//         </div>

//         <div className="mt-4 font-medium">
//           Total Milk: {(parseFloat(morning || 0) + parseFloat(evening || 0)).toFixed(1)} liters
//         </div>

//         <div className="flex gap-4 mt-4">
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//             {editingId ? "Update Record" : "Save Record"}
//           </button>
//           {editingId && (
//             <>
//               <button
//                 type="button"
//                 onClick={() => handleDelete(editingId)}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Delete Record
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel Edit
//               </button>
//             </>
//           )}
//         </div>
//         {message && <p className="mt-4 text-blue-600">{message}</p>}
//       </form>

//       {/* Monthly Records Table */}
//       <h2 className="text-lg font-bold mb-2">📅 This Month's Records</h2>
//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Morning</th>
//             <th className="border p-2">Evening</th>
//             <th className="border p-2">Total</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center p-4">
//                 No records for this month
//               </td>
//             </tr>
//           ) : (
//             records.map((r) => (
//               <tr key={r._id}>
//                 <td className="border p-2">{dayjs(r.date).tz(IST).format("YYYY-MM-DD")}</td>
//                 <td className="border p-2">{r.morning}</td>
//                 <td className="border p-2">{r.evening}</td>
//                 <td className="border p-2">{(r.morning + r.evening).toFixed(1)}</td>
//                 <td className="border p-2">
//                   <button
//                     className="text-blue-600 underline"
//                     onClick={() => handleEdit(r)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Range Report */}
//       <div className="mt-10 border-t pt-6">
//         <h2 className="text-lg font-bold mb-4">📊 Milk Range Report</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//           <div>
//             <label>From Date</label>
//             <input
//               type="date"
//               value={rangeStart}
//               onChange={(e) => setRangeStart(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label>To Date</label>
//             <input
//               type="date"
//               value={rangeEnd}
//               onChange={(e) => setRangeEnd(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label>Rate per Liter (₹)</label>
//             <input
//               type="number"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//               className="w-full p-2 border rounded"
//               step="0.1"
//             />
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={fetchRangeData}
//               className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//             >
//               Calculate
//             </button>
//           </div>
//         </div>
//         {rangeResult && (
//           <div className="mt-4 text-green-700 font-semibold">
//             <p>Total Milk: {rangeResult.totalMilk.toFixed(1)} liters</p>
//             <p>Total Earnings: ₹{rangeResult.totalPrice.toFixed(2)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import React, { useEffect, useState } from "react";
import API from "../utils/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useNavigate, Link } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

const Dashboard = () => {
  const navigate = useNavigate();
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD"));
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchMonthly = async () => {
    const year = dayjs().tz("Asia/Kolkata").year();
    const month = dayjs().tz("Asia/Kolkata").month() + 1;
    try {
      const res = await API.get(`/milk/monthly?year=${year}&month=${month}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching monthly data:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(morning) || isNaN(evening)) {
      return setMessage("Please enter valid numbers");
    }

    try {
      await API.post("/milk", {
        date: selectedDate,
        morning: parseFloat(morning),
        evening: parseFloat(evening),
      });
      setMessage("Saved successfully ✅");
      resetForm();
      fetchMonthly();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      setMessage("Error saving record ❌");
    }
  };

  const handleEdit = (record) => {
    setSelectedDate(dayjs(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD"));
    setMorning(record.morning);
    setEvening(record.evening);
    setEditingId(record._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/milk/${id}`);
      setMessage("Deleted successfully 🗑️");
      fetchMonthly();
      resetForm();
    } catch {
      setMessage("Delete failed ❌");
    }
  };

  const resetForm = () => {
    setSelectedDate(dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD"));
    setMorning("");
    setEvening("");
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchMonthly();
  }, []);

  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [rate, setRate] = useState("");
  const [rangeResult, setRangeResult] = useState(null);

  const fetchRangeData = async () => {
    if (!rangeStart || !rangeEnd || isNaN(rate)) {
      setMessage("Please fill all fields correctly");
      return;
    }

    const adjustedStart = dayjs(rangeStart).subtract(1, "day").format("YYYY-MM-DD");

    try {
      const res = await API.get(`/milk/range?start=${adjustedStart}&end=${rangeEnd}`);
      const totalMilk = res.data.reduce((sum, r) => sum + r.morning + r.evening, 0);
      const totalPrice = totalMilk * parseFloat(rate);
      setRangeResult({ totalMilk, totalPrice });
    } catch (err) {
      console.error("Range fetch error:", err);
      setMessage("Failed to calculate milk range ❌");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">🐄 Milk Record Dashboard</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Link to="/monthly-report" className="text-blue-600 hover:text-blue-900 underline mb-2 sm:mb-0 font-bold">
          📅 View Monthly Report
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 text-sm underline font-bold"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Morning Milk (liters)</label>
            <input
              type="number"
              value={morning}
              onChange={(e) => setMorning(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Evening Milk (liters)</label>
            <input
              type="number"
              value={evening}
              onChange={(e) => setEvening(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="font-bold mt-2">
          Total Milk: {(parseFloat(morning || 0) + parseFloat(evening || 0)).toFixed(1)} liters
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded transition font-bold"
          >
            {editingId ? "Update Record" : "Save Record"}
          </button>
          {editingId && (
            <>
              <button
                type="button"
                onClick={() => handleDelete(editingId)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition font-bold"
              >
                Delete Record
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition font-bold"
              >
                Cancel Edit
              </button>
            </>
          )}
        </div>
        {message && <p className="text-blue-600 mt-4 font-bold">{message}</p>}
      </form>

      <h2 className="text-xl font-bold mb-3">📅 This Month's Records</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Morning</th>
              <th className="border p-2">Evening</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 font-bold">
                  No records for this month
                </td>
              </tr>
            )}
            {records.map((r) => (
              <tr key={r._id}>
                <td className="border p-2 font-bold">{dayjs(r.date).tz("Asia/Kolkata").format("YYYY-MM-DD")}</td>
                <td className="border p-2 font-bold">{r.morning}</td>
                <td className="border p-2 font-bold">{r.evening}</td>
                <td className="border p-2 font-bold">{r.morning + r.evening}</td>
                <td className="border p-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 underline font-bold"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Milk Range Section */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">📊 Milk Range Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block font-bold mb-1">From Date</label>
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">To Date</label>
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Rate per Liter (₹)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              step="0.1"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchRangeData}
              className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded w-full transition font-bold"
            >
              Calculate
            </button>
          </div>
        </div>

        {rangeResult && (
          <div className="mt-4 text-green-700 font-bold">
            <p>Total Milk: {rangeResult.totalMilk.toFixed(1)} liters</p>
            <p>Total Earnings: ₹{rangeResult.totalPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
