import { Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TPOI } from '../../../types/types';
import { transformPoisToCategoryChartData } from '../../../utils/chartUtils';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { CATEGORY_MAP } from '../../../assets/markers/markerSVGs';
import CircleIcon from '@mui/icons-material/Circle';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { useTranslation } from 'react-i18next';

type Props = {
  poiList: TPOI[];
};

const renderLabel = (entry: { value: number }) => {
  return entry.value.toFixed(2) + ' %';
};

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && typeof payload !== 'undefined') {
    const value = payload[0].value as number;
    return (
      <Box sx={{ bgcolor: 'common.white', border: 1, padding: 2 }}>
        <Typography fontWeight="bold" color="common.black">{`${payload[0].name} : ${
          value.toFixed(2) + ' %'
        }`}</Typography>
      </Box>
    );
  }

  return null;
};

export const PieChart = ({ poiList }: Props) => {
  const data = transformPoisToCategoryChartData(poiList, 'category');
  const { t } = useTranslation();
  return (
    <Paper sx={{ height: '100%', width: '100%', p: 2, alignItems: 'flex-start', display: 'flex' }}>
      {data.length < 1 ? (
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography fontSize={32} fontWeight={600} color="#525658">
            {t('CHARTS.NO_DATA')}
          </Typography>
        </Box>
      ) : (
        <>
          <Stack spacing={2} p={2} height="100%" width="50%" overflow="auto" borderRight="1px solid #E6E8E8">
            <Typography variant="h6" textAlign="center">
              {t('CATEGORIES.CATEGORIES')}
            </Typography>
            {data.map(({ name }) => {
              const categoryInfo = CATEGORY_MAP.find((category) => category.name === name);
              return (
                <Box display="flex" alignItems="center" key={name}>
                  <CircleIcon
                    sx={{
                      height: 20,
                      width: 20,
                      color: categoryInfo?.color,
                      mr: 2
                    }}
                  />
                  <Typography>{categoryInfo?.value}</Typography>
                </Box>
              );
            })}
          </Stack>

          <ResponsiveContainer height="90%">
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="55%"
                labelLine={false}
                label={renderLabel}
              />
              <Tooltip content={<CustomTooltip />} />
            </RePieChart>
          </ResponsiveContainer>
        </>
      )}
    </Paper>
  );
};
