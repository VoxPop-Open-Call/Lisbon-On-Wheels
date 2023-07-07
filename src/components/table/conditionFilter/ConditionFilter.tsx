import { TPOI } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, IconButton, SelectChangeEvent, Typography } from '@mui/material';
import { FieldSelect } from './conditionRow/FieldSelect';
import { OperatorSelect } from './conditionRow/OperatorSelect';
import { POIPropertyType, POITypeMap, getInitialConditionValue } from '../../../utils/filterUtils';
import { useEffect, useState } from 'react';
import { ConditionInput } from './conditionRow/ConditionInput';
import ClearIcon from '@mui/icons-material/Clear';

export type TChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent;

export type Operator = '<' | '=' | '>' | '>=' | '<=' | 'in' | 'not in';

export type Condition = {
  field: keyof TPOI;
  operator: Operator;
  operands: Array<string | number | boolean>;
};

type Props = {
  condition: Condition;
  index: number;
  updateCondition: (
    index: number,
    conditionField: 'field' | 'operator' | 'operands',
    value: string | number | boolean,
    type?: 'add' | 'remove' | 'update',
    operandIndex?: number
  ) => void;
  removeCondition: (index: number) => void;
};

export const ConditionFilter = ({ condition, updateCondition, removeCondition, index }: Props) => {
  const [operandIds, setOperandIds] = useState<string[]>([]);

  useEffect(() => {
    const initialOperandIds = condition.operands.map(() => uuidv4());
    setOperandIds(initialOperandIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: TChangeEvent, conditionField: 'field' | 'operator' | 'operands', operandIndex?: number) => {
    const value =
      POITypeMap[condition.field] === POIPropertyType.BOOLEAN && conditionField === 'operands'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    if (conditionField === 'field') setOperandIds([]);
    updateCondition(index, conditionField, value, conditionField === 'operands' ? 'update' : undefined, operandIndex);
  };

  const addOperand = () => {
    const newOperandId = uuidv4();
    setOperandIds((prevIds) => [...prevIds, newOperandId]);
    updateCondition(index, 'operands', getInitialConditionValue(condition.field), 'add');
  };

  const renderAdditionalButton = () => {
    if (POITypeMap[condition.field] === POIPropertyType.ENUM) {
      return <Button onClick={addOperand}>+ OR</Button>;
    }
    return null;
  };

  return (
    <Box sx={{ marginBottom: 2, display: 'flex' }}>
      <IconButton color="error" sx={{ mr: 1 }} onClick={() => removeCondition(index)}>
        <ClearIcon />
      </IconButton>
      <FieldSelect purpose="condition" value={condition.field} onChange={(e) => onChange(e, 'field')} />
      <OperatorSelect
        value={condition.operator}
        selectedPropertyToFilter={condition.field}
        onChange={(e) => onChange(e, 'operator')}
      />
      <ConditionInput field={condition.field} onChange={(e) => onChange(e, 'operands', 0)} />
      {condition.operands.map((_operand, operandIndex) => {
        return operandIndex === 0 ? null : (
          <Box display="flex" flexDirection="row" alignItems="center" key={operandIds[operandIndex]}>
            <Typography mx={1}>OR</Typography>
            <ConditionInput field={condition.field} onChange={(e) => onChange(e, 'operands', operandIndex)} />
          </Box>
        );
      })}
      {renderAdditionalButton()}
    </Box>
  );
};
