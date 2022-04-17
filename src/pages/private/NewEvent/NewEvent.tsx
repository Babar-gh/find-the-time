import { useState } from 'react';
import DatePicker from 'ui-kit/DatePicker';
import Page from 'ui-kit/Page';

const NewEvent: React.VFC = () => {
  const [value, setValue] = useState<any>(new Date());

  return (
    <Page title="New Event">
      <DatePicker value={value} onChange={(value) => setValue(value)} />
    </Page>
  );
};

export default NewEvent;
