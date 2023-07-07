import { Box } from '@mui/material';
import { ConditionFilter } from './ConditionFilter';
import { useCreationContext } from '../../../utils/contextHelper';
import { TPOI } from '../../../types/types';
import { getInitialConditionValue } from '../../../utils/filterUtils';

export const ConditionFilterSection = () => {
  const {
    filters: { conditions },
    dispatch
  } = useCreationContext();

  const removeCondition = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    dispatch({ type: 'SET_CONDITIONS', payload: updatedConditions });
  };

  const updateCondition = (
    index: number,
    conditionField: 'field' | 'operator' | 'operands',
    value: string | number | boolean,
    action?: 'add' | 'remove' | 'update',
    operandIndex?: number
  ) => {
    const updatedConditions = [...conditions];

    if (conditionField === 'field') {
      updatedConditions[index].operands = [getInitialConditionValue(value as keyof TPOI)];
    }

    if (conditionField === 'operands') {
      if (action === 'update' && operandIndex !== undefined) {
        updatedConditions[index].operands[operandIndex] = value;
        return;
      }

      if (action === 'remove') {
        updatedConditions[index].operands = updatedConditions[index].operands.filter((o) => o !== value);
      } else {
        updatedConditions[index].operands.push(value);
      }
    } else {
      updatedConditions[index] = { ...conditions[index], [conditionField]: value };
    }

    dispatch({ type: 'SET_CONDITIONS', payload: updatedConditions });
  };

  return (
    <Box display="flex" flexDirection="column">
      {conditions?.map((condition, index) => (
        <ConditionFilter
          key={`${condition.field + index}`}
          condition={condition}
          removeCondition={removeCondition}
          updateCondition={updateCondition}
          index={index}
        />
      ))}
    </Box>
  );
};
