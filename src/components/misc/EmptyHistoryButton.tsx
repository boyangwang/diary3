import { emptyEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import Button from '../button';

function EmptyHistoryButton() {
  const dispatch = useAppDispatch();

  const emptyHistory = () => {
    dispatch(emptyEntryInstance());
  };

  return <Button onClick={() => emptyHistory()}>empty history</Button>;
}
export default EmptyHistoryButton;
