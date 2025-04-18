// import React, { useState, useMemo, useEffect } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import "./SalesReport.css";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // --- Enhanced Mock Sales Data with Items ---
// const mockSalesData = [
//   {
//     id: "S001",
//     date: "2023-10-26",
//     time: "10:30",
//     paymentMethod: "Cash",
//     items: [
//       { name: "Espresso", quantity: 2, price: 60 },
//       { name: "Croissant", quantity: 1, price: 45 },
//     ],
//     totalAmount: 165.0,
//   },
//   {
//     id: "S002",
//     date: "2023-10-26",
//     time: "11:15",
//     paymentMethod: "PromptPay",
//     items: [
//       { name: "Latte", quantity: 1, price: 75 },
//       { name: "Muffin", quantity: 1, price: 50 },
//     ],
//     totalAmount: 125.0,
//   },
//   {
//     id: "S003",
//     date: "2023-10-27",
//     time: "14:00",
//     paymentMethod: "Master Card",
//     items: [
//       { name: "Cappuccino", quantity: 2, price: 70 },
//       { name: "Sandwich", quantity: 1, price: 90 },
//       { name: "Espresso", quantity: 1, price: 60 },
//     ],
//     totalAmount: 290.0,
//   },
//   {
//     id: "S004",
//     date: "2023-10-27",
//     time: "19:45",
//     paymentMethod: "Cash",
//     items: [
//       { name: "Latte", quantity: 3, price: 75 },
//       { name: "Cake Slice", quantity: 2, price: 80 },
//     ],
//     totalAmount: 385.0,
//   },
//   {
//     id: "S005",
//     date: "2023-10-28",
//     time: "09:05",
//     paymentMethod: "Cash",
//     items: [{ name: "Espresso", quantity: 1, price: 60 }],
//     totalAmount: 60.0,
//   },
//   {
//     id: "S006",
//     date: "2023-10-28",
//     time: "12:30",
//     paymentMethod: "PromptPay",
//     items: [
//       { name: "Latte", quantity: 1, price: 75 },
//       { name: "Sandwich", quantity: 2, price: 90 },
//       { name: "Croissant", quantity: 1, price: 45 },
//     ],
//     totalAmount: 300.0,
//   },
//   {
//     id: "S007",
//     date: "2023-10-29",
//     time: "15:00",
//     paymentMethod: "Master Card",
//     items: [
//       { name: "Cappuccino", quantity: 1, price: 70 },
//       { name: "Muffin", quantity: 2, price: 50 },
//     ],
//     totalAmount: 170.0,
//   },
//   {
//     id: "S008",
//     date: "2023-10-29",
//     time: "20:10",
//     paymentMethod: "Cash",
//     items: [
//       { name: "Espresso", quantity: 3, price: 60 },
//       { name: "Cake Slice", quantity: 1, price: 80 },
//       { name: "Latte", quantity: 1, price: 75 },
//     ],
//     totalAmount: 335.0,
//   },
// ];

// // Helper to format currency (e.g., THB)
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("th-TH", {
//     style: "currency",
//     currency: "THB",
//   }).format(amount);
// };

// // Chart Colors
// const chartColors = [
//   "rgba(54, 162, 235, 0.6)", // Blue
//   "rgba(255, 99, 132, 0.6)", // Red
//   "rgba(75, 192, 192, 0.6)", // Green
//   "rgba(255, 206, 86, 0.6)", // Yellow
//   "rgba(153, 102, 255, 0.6)", // Purple
//   "rgba(255, 159, 64, 0.6)", // Orange
// ];
// const chartBorderColors = [
//   "rgba(54, 162, 235, 1)",
//   "rgba(255, 99, 132, 1)",
//   "rgba(75, 192, 192, 1)",
//   "rgba(255, 206, 86, 1)",
//   "rgba(153, 102, 255, 1)",
//   "rgba(255, 159, 64, 1)",
// ];

// const SalesReport = () => {
//   const [salesData, setSalesData] = useState(mockSalesData); // In real app, fetch this data
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("all");

//   // --- Filtering Logic ---
//   const filteredSales = useMemo(() => {
//     return salesData.filter((sale) => {
//       const saleDate = new Date(sale.date);
//       const start = startDate ? new Date(startDate) : null;
//       const end = endDate ? new Date(endDate) : null;
//       if (end) end.setHours(23, 59, 59, 999); // Include end date

//       const dateMatch =
//         (!start || saleDate >= start) && (!end || saleDate <= end);
//       const paymentMatch =
//         paymentFilter === "all" || sale.paymentMethod === paymentFilter;

//       return dateMatch && paymentMatch;
//     });
//   }, [salesData, startDate, endDate, paymentFilter]);

//   // --- Calculations for Summary ---
//   const totalSalesAmount = useMemo(() => {
//     return filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
//   }, [filteredSales]);

//   const totalItemsSoldCount = useMemo(() => {
//     return filteredSales.reduce(
//       (sum, sale) =>
//         sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
//       0
//     );
//   }, [filteredSales]);

//   // --- Data Processing for Charts ---

//   // Sales Trend (Bar Chart)
//   const salesTrendData = useMemo(() => {
//     const salesByDate = filteredSales.reduce((acc, sale) => {
//       const date = sale.date;
//       acc[date] = (acc[date] || 0) + sale.totalAmount;
//       return acc;
//     }, {});

//     const sortedDates = Object.keys(salesByDate).sort(
//       (a, b) => new Date(a) - new Date(b)
//     );
//     return {
//       labels: sortedDates,
//       datasets: [
//         {
//           label: "Daily Sales Amount",
//           data: sortedDates.map((date) => salesByDate[date]),
//           backgroundColor: "rgba(75, 192, 192, 0.6)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };
//   }, [filteredSales]);

//   // Payment Method Distribution (Pie Chart)
//   const paymentDistributionData = useMemo(() => {
//     const salesByPayment = filteredSales.reduce((acc, sale) => {
//       const method = sale.paymentMethod;
//       acc[method] = (acc[method] || 0) + sale.totalAmount;
//       return acc;
//     }, {});

//     return {
//       labels: Object.keys(salesByPayment),
//       datasets: [
//         {
//           label: "Sales by Payment Method",
//           data: Object.values(salesByPayment),
//           backgroundColor: chartColors,
//           borderColor: chartBorderColors,
//           borderWidth: 1,
//         },
//       ],
//     };
//   }, [filteredSales]);

//   // --- Data Processing for Most Sold Items ---
//   const mostSoldItems = useMemo(() => {
//     const itemCounts = filteredSales.reduce((acc, sale) => {
//       sale.items.forEach((item) => {
//         acc[item.name] = (acc[item.name] || 0) + item.quantity;
//       });
//       return acc;
//     }, {});

//     return Object.entries(itemCounts)
//       .sort(([, countA], [, countB]) => countB - countA) // Sort descending by count
//       .slice(0, 10); // Show top 10 items
//   }, [filteredSales]);

//   // --- Handlers ---
//   const handleClearFilters = () => {
//     setStartDate("");
//     setEndDate("");
//     setPaymentFilter("all");
//   };

//   const paymentMethods = useMemo(() => {
//     const methods = new Set(salesData.map((sale) => sale.paymentMethod));
//     return ["all", ...Array.from(methods)];
//   }, [salesData]);

//   // Chart Options
//   const barChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Daily Sales Trend" },
//     },
//     scales: { y: { beginAtZero: true } },
//   };

//   const pieChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Sales by Payment Method" },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.label || "";
//             if (label) {
//               label += ": ";
//             }
//             if (context.parsed !== null) {
//               const total = context.chart.data.datasets[0].data.reduce(
//                 (a, b) => a + b,
//                 0
//               );
//               const value = context.parsed;
//               const percentage = ((value / total) * 100).toFixed(1) + "%";
//               label += formatCurrency(value) + ` (${percentage})`;
//             }
//             return label;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="sales-report-container ">
//       <h2>Sales Report</h2>

//       {/* --- Filter Section --- */}
//       <div className="filters-section card">
//         <h3>Filters</h3>
//         <div className="filter-controls">
//           {/* ... (filter inputs remain the same) ... */}
//           <div className="filter-group">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="filter-group">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="date"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate}
//             />
//           </div>
//           <div className="filter-group">
//             <label htmlFor="paymentFilter">Payment Method:</label>
//             <select
//               id="paymentFilter"
//               value={paymentFilter}
//               onChange={(e) => setPaymentFilter(e.target.value)}
//             >
//               {paymentMethods.map((method) => (
//                 <option key={method} value={method}>
//                   {method === "all" ? "All Methods" : method}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button onClick={handleClearFilters} className="clear-filters-button">
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* --- Summary Section --- */}
//       <div className="summary-section card">
//         <h3>Summary</h3>
//         <div className="summary-details">
//           <p>
//             <strong>Total Transactions:</strong> {filteredSales.length}
//           </p>
//           <p>
//             <strong>Total Items Sold:</strong> {totalItemsSoldCount}
//           </p>
//           <p>
//             <strong>Total Sales Amount:</strong>{" "}
//             {formatCurrency(totalSalesAmount)}
//           </p>
//         </div>
//       </div>

//       {/* --- Graphs Section --- */}
//       <div className="graphs-section card">
//         <h3>Visualizations</h3>
//         <div className="charts-container">
//           <div className="chart-wrapper">
//             {filteredSales.length > 0 ? (
//               <Bar options={barChartOptions} data={salesTrendData} />
//             ) : (
//               <p className="no-data-message">No data for sales trend chart.</p>
//             )}
//           </div>
//           <div className="chart-wrapper">
//             {filteredSales.length > 0 &&
//             Object.keys(paymentDistributionData.labels).length > 0 ? (
//               <Pie options={pieChartOptions} data={paymentDistributionData} />
//             ) : (
//               <p className="no-data-message">
//                 No data for payment distribution chart.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- Most Sold Items Section --- */}
//       <div className="most-sold-items-section card">
//         <h3>Top Sold Items</h3>
//         {mostSoldItems.length > 0 ? (
//           <div className="table-wrapper">
//             <table className="items-table">
//               <thead>
//                 <tr>
//                   <th>Rank</th>
//                   <th>Item Name</th>
//                   <th>Quantity Sold</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mostSoldItems.map(([name, quantity], index) => (
//                   <tr key={name}>
//                     <td>{index + 1}</td>
//                     <td>{name}</td>
//                     <td>{quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="no-data-message">
//             No item data available for the selected filters.
//           </p>
//         )}
//       </div>

//       {/* --- Detailed Sales Table Section --- */}
//       <div className="sales-table-section card">
//         <h3>Detailed Transactions</h3>
//         {filteredSales.length > 0 ? (
//           <div className="table-wrapper">
//             <table className="sales-table">
//               <thead>
//                 <tr>
//                   <th>Sale ID</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   {/* <th>Items Sold (Count)</th> */}
//                   <th>Payment Method</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSales.map((sale) => (
//                   <tr key={sale.id}>
//                     <td>{sale.id}</td>
//                     <td>{sale.date}</td>
//                     <td>{sale.time}</td>
//                     {/* <td>{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td> */}
//                     <td>{sale.paymentMethod}</td>
//                     <td>{formatCurrency(sale.totalAmount)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan="3">
//                     <strong>Totals</strong>
//                   </td>
//                   {/* <td><strong>{totalItemsSoldCount}</strong></td> */}
//                   <td></td>
//                   <td>
//                     <strong>{formatCurrency(totalSalesAmount)}</strong>
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         ) : (
//           <p className="no-data-message">
//             No sales data matches the current filters.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SalesReport;
import React, { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useOrderContext } from "../../Context/OrderProvider"; // Adjust the import path as needed
import "./SalesReport.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Helper to format currency (e.g., THB)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};

// Chart Colors
const chartColors = [
  "rgba(54, 162, 235, 0.6)", // Blue
  "rgba(255, 99, 132, 0.6)", // Red
  "rgba(75, 192, 192, 0.6)", // Green
  "rgba(255, 206, 86, 0.6)", // Yellow
  "rgba(153, 102, 255, 0.6)", // Purple
  "rgba(255, 159, 64, 0.6)", // Orange
];
const chartBorderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

// Helper to calculate total amount from items
const getTotalAmount = (items) => {
  const validItems = items.filter(
    (item) => item.itemName && !isNaN(parseFloat(item.itemPrice))
  );
  return validItems.reduce(
    (sum, item) => sum + (item.quantity || 1) * parseFloat(item.itemPrice),
    0
  );
};

const SalesReport = () => {
  const { orderHistory, paymentOptions } = useOrderContext(); // Fetch real data from context
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Transform orderHistory into the format expected by SalesReport
  const salesData = useMemo(() => {
    return orderHistory.map((order) => ({
      id: order.id.toString(),
      date: order.date, // e.g., "26 Oct 2023"
      time: order.time, // e.g., "10:30 AM"
      paymentMethod: order.paymentMethod || "Cash", // Default to "Cash" if not set
      items: order.items.map((item) => ({
        name: item.itemName,
        quantity: item.quantity || 1, // Default to 1 if not specified
        price: parseFloat(item.itemPrice) || 0,
      })),
      totalAmount: getTotalAmount(order.items),
    }));
  }, [orderHistory]);

  // --- Filtering Logic ---
  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      // Parse "DD Mon YYYY" format to Date object
      const [day, monthStr, year] = sale.date.split(" ");
      const monthIndex = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].indexOf(monthStr);
      const saleDate = new Date(year, monthIndex, day);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (end) end.setHours(23, 59, 59, 999); // Include full end date

      const dateMatch =
        (!start || saleDate >= start) && (!end || saleDate <= end);
      const paymentMatch =
        paymentFilter === "all" || sale.paymentMethod === paymentFilter;

      return dateMatch && paymentMatch;
    });
  }, [salesData, startDate, endDate, paymentFilter]);

  // --- Calculations for Summary ---
  const totalSalesAmount = useMemo(() => {
    return filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  }, [filteredSales]);

  const totalItemsSoldCount = useMemo(() => {
    return filteredSales.reduce(
      (sum, sale) =>
        sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
  }, [filteredSales]);

  // --- Data Processing for Charts ---
  const salesTrendData = useMemo(() => {
    const salesByDate = filteredSales.reduce((acc, sale) => {
      const date = sale.date; // Use date string as-is for labels
      acc[date] = (acc[date] || 0) + sale.totalAmount;
      return acc;
    }, {});

    const sortedDates = Object.keys(salesByDate).sort(
      (a, b) =>
        new Date(a.split(" ").reverse().join("-").replace(" ", "-")) -
        new Date(b.split(" ").reverse().join("-").replace(" ", "-"))
    );
    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Daily Sales Amount",
          data: sortedDates.map((date) => salesByDate[date]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [filteredSales]);

  const paymentDistributionData = useMemo(() => {
    const salesByPayment = filteredSales.reduce((acc, sale) => {
      const method = sale.paymentMethod;
      acc[method] = (acc[method] || 0) + sale.totalAmount;
      return acc;
    }, {});

    return {
      labels: Object.keys(salesByPayment),
      datasets: [
        {
          label: "Sales by Payment Method",
          data: Object.values(salesByPayment),
          backgroundColor: chartColors,
          borderColor: chartBorderColors,
          borderWidth: 1,
        },
      ],
    };
  }, [filteredSales]);

  const mostSoldItems = useMemo(() => {
    const itemCounts = filteredSales.reduce((acc, sale) => {
      sale.items.forEach((item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
      });
      return acc;
    }, {});

    return Object.entries(itemCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10);
  }, [filteredSales]);

  // --- Handlers ---
  const handleClearFilters = () => {
    setStartDate("");
    setEndDate("");
    setPaymentFilter("all");
  };

  const paymentMethods = useMemo(() => {
    const enabledMethods = paymentOptions
      .filter((opt) => opt.enabled)
      .map((opt) => opt.name);
    return ["all", ...enabledMethods];
  }, [paymentOptions]);

  // Chart Options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Daily Sales Trend" },
    },
    scales: { y: { beginAtZero: true } },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales by Payment Method" },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) label += ": ";
            if (context.parsed !== null) {
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const value = context.parsed;
              const percentage = ((value / total) * 100).toFixed(1) + "%";
              label += formatCurrency(value) + ` (${percentage})`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="sales-report-container">
      <h2>Sales Report</h2>

      {/* --- Filter Section --- */}
      <div className="filters-section card">
        <h3>Filters</h3>
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="paymentFilter">Payment Method:</label>
            <select
              id="paymentFilter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method === "all" ? "All Methods" : method}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleClearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>
      </div>

      {/* --- Summary Section --- */}
      <div className="summary-section card">
        <h3>Summary</h3>
        <div className="summary-details">
          <p>
            <strong>Total Transactions:</strong> {filteredSales.length}
          </p>
          <p>
            <strong>Total Items Sold:</strong> {totalItemsSoldCount}
          </p>
          <p>
            <strong>Total Sales Amount:</strong>{" "}
            {formatCurrency(totalSalesAmount)}
          </p>
        </div>
      </div>

      {/* --- Graphs Section --- */}
      <div className="graphs-section card">
        <h3>Visualizations</h3>
        <div className="charts-container">
          <div className="chart-wrapper">
            {filteredSales.length > 0 ? (
              <Bar options={barChartOptions} data={salesTrendData} />
            ) : (
              <p className="no-data-message">No data for sales trend chart.</p>
            )}
          </div>
          <div className="chart-wrapper">
            {filteredSales.length > 0 &&
            paymentDistributionData.labels.length > 0 ? (
              <Pie options={pieChartOptions} data={paymentDistributionData} />
            ) : (
              <p className="no-data-message">
                No data for payment distribution chart.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- Most Sold Items Section --- */}
      <div className="most-sold-items-section card">
        <h3>Top Sold Items</h3>
        {mostSoldItems.length > 0 ? (
          <div className="table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Item Name</th>
                  <th>Quantity Sold</th>
                </tr>
              </thead>
              <tbody>
                {mostSoldItems.map(([name, quantity], index) => (
                  <tr key={name}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data-message">
            No item data available for the selected filters.
          </p>
        )}
      </div>

      {/* --- Detailed Sales Table Section --- */}
      <div className="sales-table-section card">
        <h3>Detailed Transactions</h3>
        {filteredSales.length > 0 ? (
          <div className="table-wrapper">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Sale ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Payment Method</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.id}</td>
                    <td>{sale.date}</td>
                    <td>{sale.time}</td>
                    <td>{sale.paymentMethod}</td>
                    <td>{formatCurrency(sale.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">
                    <strong>Totals</strong>
                  </td>
                  <td>
                    <strong>{formatCurrency(totalSalesAmount)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="no-data-message">
            No sales data matches the current filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
