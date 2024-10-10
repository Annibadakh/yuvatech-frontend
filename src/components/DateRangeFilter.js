import React from 'react';
import { Input, Button } from 'reactstrap';

const DateRangeColumnFilter = ({ column: { filterValue = [], setFilter } }) => {
  const [minDate, maxDate] = filterValue;

  const handleMinDateChange = (e) => {
    const val = e.target.value || undefined;
    setFilter((old = []) => [val, old[1]]);
  };

  const handleMaxDateChange = (e) => {
    const val = e.target.value || undefined;
    setFilter((old = []) => [old[0], val]);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input
        type="date"
        value={minDate || ''}
        onChange={handleMinDateChange}
        placeholder="From Date"
        style={{ marginRight: '10px' }}
      />
      <Input
        type="date"
        value={maxDate || ''}
        onChange={handleMaxDateChange}
        placeholder="To Date"
        style={{ marginRight: '10px' }}
      />
      <Button onClick={() => setFilter([])}>Clear</Button>
    </div>
  );
};

export default DateRangeColumnFilter;
