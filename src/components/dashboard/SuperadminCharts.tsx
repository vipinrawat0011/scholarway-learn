
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

// Type for BarChart props
interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  name: string;
  color?: string;
}

// Type for PieChart props
interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

// Type for LineChart props
interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  name: string;
  color?: string;
}

// Bar Chart component
export const BarChart: React.FC<BarChartProps> = ({ data, xKey, yKey, name, color = "#4840BC" }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yKey} name={name} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Pie Chart component
export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const COLORS = data.map(item => item.color || "#4840BC");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

// Line Chart component
export const LineChart: React.FC<LineChartProps> = ({ data, xKey, yKey, name, color = "#4840BC" }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yKey} name={name} stroke={color} activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Combined institute stats chart component
export const InstituteStatsCharts: React.FC<{ data: any }> = ({ data }) => {
  if (!data || !data.stats) return null;
  
  const { teachers, students, courses, monthlyData } = data.stats;
  
  // Format data for charts
  const pieData = [
    { name: 'Teachers', value: teachers, color: '#FFCD61' },
    { name: 'Students', value: students, color: '#4840BC' },
    { name: 'Courses', value: courses, color: '#8E6E4C' },
  ];
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="growth">Growth</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-school-brown">Institute Overview</CardTitle>
            <CardDescription>Monthly growth of students and courses</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={monthlyData} 
              xKey="month" 
              yKey="studentCount" 
              name="Students" 
              color="#4840BC"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="growth" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-school-brown">Course Growth</CardTitle>
            <CardDescription>Number of courses added per month</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={monthlyData} 
              xKey="month" 
              yKey="courseCount" 
              name="Courses" 
              color="#FFCD61"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="distribution" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-school-brown">Resource Distribution</CardTitle>
            <CardDescription>Distribution of teachers, students, and courses</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={pieData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InstituteStatsCharts;
