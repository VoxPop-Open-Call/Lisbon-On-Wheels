import { Box } from '@mui/material';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TPOI } from '../../../types/types';

const mapPoisToBarChart = (poiList: TPOI[], field: keyof TPOI) => {
  return poiList.map((poi) => {
    return {
      name: poi.name,
      value: poi[field]
    };
  });
};

type Props = {
  poiList: TPOI[];
  field: keyof TPOI;
};

export const BarChart = ({ poiList, field }: Props) => {
  const data = mapPoisToBarChart(poiList, field);
  return (
    <Box width="50vw" height="50vh">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={90} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </ReBarChart>
      </ResponsiveContainer>
    </Box>
  );
};
