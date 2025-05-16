import React, { useState, useEffect } from "react";
import API from "../utils/api";
import dayjs from "dayjs";

const MonthlyReport = () => {
  const now = dayjs();
  const [year, setYear] = useState(now.year());
  const [month, setMonth] = useState(now.month() + 1);
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editMorning, setEditMorning] = useState(0);
  const [editEvening, setEditEvening] = useState(0);

  const fetchRecords = async () => {
    try {
      const res = await API.get(`/milk/monthly?year=${year}&month=${month}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [year, month]);

  const handleEdit = (record) => {
    setEditId(record._id);
    setEditMorning(record.morning);
    setEditEvening(record.evening);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleSave = async (id) => {
    try {
      await API.put(`/milk/${id}`, {
        morning: parseFloat(editMorning),
        evening: parseFloat(editEvening),
      });
      setEditId(null);
      fetchRecords();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const formatDate = (date) => dayjs(date).format("DD MMM YYYY");

  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [rate, setRate] = useState("");
  const [rangeResult, setRangeResult] = useState(null);
  const [message, setMessage] = useState("");

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📅 Monthly Milk Report</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <div>
          <label className="block mb-1 font-bold">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2 rounded w-24 font-semibold"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border p-2 rounded w-36 font-semibold"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {dayjs().month(i).format("MMMM")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Morning</th>
              <th className="border p-2">Evening</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 font-semibold">
                  No records found
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="border p-2 font-semibold">{formatDate(r.date)}</td>

                  {editId === r._id ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={editMorning}
                          onChange={(e) => setEditMorning(e.target.value)}
                          className="w-20 border p-1 font-semibold"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={editEvening}
                          onChange={(e) => setEditEvening(e.target.value)}
                          className="w-20 border p-1 font-semibold"
                        />
                      </td>
                      <td className="border p-2 font-bold">
                        {(parseFloat(editMorning) + parseFloat(editEvening)).toFixed(1)}
                      </td>
                      <td className="border p-2 flex gap-2 justify-center">
                        <button
                          onClick={() => handleSave(r._id)}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-2 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2 font-semibold">{r.morning}</td>
                      <td className="border p-2 font-semibold">{r.evening}</td>
                      <td className="border p-2 font-bold">{(r.morning + r.evening).toFixed(1)}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handleEdit(r)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Milk Range Report */}
      <div className="mt-10 border-t pt-6">
        <h2 className="text-lg font-bold mb-4">📊 Milk Range Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="font-bold">From Date</label>
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              className="w-full p-2 border rounded font-semibold"
            />
          </div>
          <div>
            <label className="font-bold">To Date</label>
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              className="w-full p-2 border rounded font-semibold"
            />
          </div>
          <div>
            <label className="font-bold">Rate per Liter (₹)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded font-semibold"
              step="0.1"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchRangeData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-bold"
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
        {message && !rangeResult && (
          <p className="text-red-600 font-bold mt-2">{message}</p>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;
