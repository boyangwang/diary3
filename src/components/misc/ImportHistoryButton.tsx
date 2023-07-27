import { createEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import historyJson from '../../scripts/entry-instances-history-20230211-0106.json';
import Button from '../button';

function ImportHistoryButton() {
  const dispatch = useAppDispatch();

  const importHistory = () => {
    console.log(historyJson);
    for (const entryInstance of historyJson) {
      dispatch(createEntryInstance(entryInstance));
    }
  };

  return <Button onClick={() => importHistory()}>import history</Button>;
}
export default ImportHistoryButton;
