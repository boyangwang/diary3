import { emptyEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';

function EmptyHistoryButton() {
  const dispatch = useAppDispatch();

  const emptyHistory = () => {
    dispatch(emptyEntryInstance());
  };

  return <button onClick={() => emptyHistory()}>empty history</button>;
}
export default EmptyHistoryButton;
