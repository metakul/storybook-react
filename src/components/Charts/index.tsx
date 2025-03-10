import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Typography, Box } from "@mui/material";

// Raw data
const rawData = [
  { name: "Team", value: 20 },
  { name: "Investors", value: 15 },
  { name: "Marketing", value: 20 },
  { name: "Community", value: 15 },
  { name: "Liquidity", value: 30 },
];

// Calculate total sum
const total = rawData.reduce((sum, entry) => sum + entry.value, 0);

// Add percentage to each entry
const data = rawData.map(entry => ({
  ...entry,
  percentage: ((entry.value / total) * 100).toFixed(1) + "%" // Keep 1 decimal place
}));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF0042", "green"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, percentage } = payload[0].payload;
    return (
      <Box sx={{ backgroundColor: "black", p: 1, borderRadius: 1, boxShadow: 2 }}>
        <Typography variant="body2" fontWeight="bold">{name}</Typography>
        {/* <Typography variant="body2">Value: {value}</Typography> */}
        <Typography variant="body2">Percentage: {percentage}</Typography>
      </Box>
    );
  }
  return null;
};

const TokenomicsChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieLeave = () => setActiveIndex(null);

  return (
    <Box sx={{ padding: 3, my: 10, mx: 4, backgroundColor: "transparent" }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 800,
          color: "#1A237E",
          lineHeight: 1.1,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          mb: { xs: 2, md: 4 },
          fontFamily: '"BakBak One", "Roboto", sans-serif',
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        Token Distribution
      </Typography>

      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onMouseLeave={onPieLeave}
            isAnimationActive
            label={({ name, percentage }) => `${name}: ${percentage}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={activeIndex === index ? "#000" : "none"}
                strokeWidth={activeIndex === index ? 4 : 1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend verticalAlign="bottom" align="center" /> */}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TokenomicsChart;
