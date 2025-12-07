import { createFileRoute } from '@tanstack/react-router'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

export const Route = createFileRoute('/admin/Dashboard/BanLamViec/')({
  component: RouteComponent,
})

// ------------------ STATIC DATA -------------------
const pieData1 = [{ name: 'Total Order', value: 81 }]
const pieData2 = [{ name: 'Growth', value: 22 }]
const pieData3 = [{ name: 'Revenue', value: 62 }]


const orderChart = [
  { name: 'Sun', orders: 120 },
  { name: 'Mon', orders: 180 },
  { name: 'Tue', orders: 140 },
  { name: 'Wed', orders: 456 },
  { name: 'Thu', orders: 320 },
  { name: 'Fri', orders: 270 },
  { name: 'Sat', orders: 300 },
]

const revenueChart = [
  { month: 'Jan', y2020: 12000, y2021: 10000 },
  { month: 'Feb', y2020: 18000, y2021: 14000 },
  { month: 'Mar', y2020: 15000, y2021: 17000 },
  { month: 'Apr', y2020: 20000, y2021: 16000 },
  { month: 'May', y2020: 38000, y2021: 21000 },
  { month: 'Jun', y2020: 28000, y2021: 25000 },
  { month: 'Jul', y2020: 35000, y2021: 28000 },
  { month: 'Aug', y2020: 24000, y2021: 23000 },
  { month: 'Sept', y2020: 18000, y2021: 22000 },
  { month: 'Oct', y2020: 40000, y2021: 12500 },
]

const customerMap = [
  { day: 'Sun', value: 80 },
  { day: 'Mon', value: 100 },
  { day: 'Tue', value: 90 },
  { day: 'Wed', value: 70 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 95 },
]

// ------------------ MAIN COMPONENT -------------------

function RouteComponent() {
  return (
    <div className="p-6 space-y-6">

       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ecommerce Dashboard</h1>

        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded">Day</button>
          <button className="px-3 py-1 bg-gray-200 rounded">Week</button>
          <button className="px-3 py-1 bg-gray-200 rounded">Month</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded">
            Annual
          </button>
          <input
            type="date"
            className="px-3 py-1 border rounded"
            defaultValue="2019-04-30"
          />
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TopCard title="Total Orders" value="75" percent="+4% (30 days)" icon="🛒" />
        <TopCard title="Total Delivered" value="357" percent="+8% (30 days)" icon="📦" />
        <TopCard title="Total Canceled" value="65" percent="-2% (30 days)" icon="❌" />
        <TopCard title="Total Revenue" value="$128" percent="+12% (30 days)" icon="💰" />
      </div>

      {/* PIE CHARTS + LINE CHART SMALL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PIE CHARTS */}
        <div className="col-span-2 bg-white p-5 shadow rounded-xl">
          <h2 className="font-semibold mb-4">Pie Chart</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PieChartBox title="Total Order" data={pieData1} color="#FF6B6B" />
            <PieChartBox title="Customer Growth" data={pieData2} color="#36B37E" />
            <PieChartBox title="Total Revenue" data={pieData3} color="#5E83FF" />
          </div>
        </div>

        {/* LINE CHART SMALL */}
        <div className="bg-white p-5 shadow rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Chart Order</h2>
            <button className="px-3 py-1 border rounded text-blue-600">Save Report</button>
          </div>

          <LineChart width={350} height={200} data={orderChart}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#5E83FF" strokeWidth={3} />
          </LineChart>
        </div>
      </div>

      {/* TWO BIG CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* REVENUE LINE CHART */}
        <div className="col-span-2 bg-white p-5 shadow rounded-xl">
          <h2 className="font-semibold mb-4">Total Revenue</h2>

          <LineChart width={700} height={300} data={revenueChart}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip />
            <Line type="monotone" dataKey="y2020" stroke="#5E83FF" strokeWidth={3} />
            <Line type="monotone" dataKey="y2021" stroke="#FF6B6B" strokeWidth={3} />
          </LineChart>
        </div>

        {/* CUSTOMER BAR CHART */}
        <div className="bg-white p-5 shadow rounded-xl">
          <h2 className="font-semibold mb-4">Customer Map</h2>

          <BarChart width={350} height={300} data={customerMap}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="day" />
            <Tooltip />
            <Bar dataKey="value" fill="#FFB200" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

// ------------------ COMPONENTS -------------------

interface TopCardProps {
  title: string
  value: string
  percent: string
  icon: string
}

function TopCard({ title, value, percent, icon }: TopCardProps) {
  return (
    <div className="bg-white shadow p-5 rounded-xl flex items-center space-x-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xs text-green-500 mt-1">{percent}</div>
      </div>
    </div>
  )
}

interface PieProps {
  title: string
  data: any[]
  color: string
}

function PieChartBox({ title, data, color }: PieProps) {
  return (
    <div className="flex flex-col items-center">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={60}
        >
          <Cell fill={color} />
        </Pie>
      </PieChart>

      <div className="text-xl font-semibold">{data[0].value}%</div>
      <div className="text-gray-600 text-sm">{title}</div>
    </div>
  )
}
