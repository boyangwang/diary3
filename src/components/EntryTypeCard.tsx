import { Button, Card } from 'antd';
import { EntryType } from '../app/types-constants';
import { deleteEntryType } from '../app/entry-types-slice';
import { useAppDispatch } from '../app/store';

const { Meta } = Card;

const EntryTypeCardDeleteButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      danger
      onClick={() => {
        dispatch(deleteEntryType(props.entryType.id));
      }}
    >
      Delete
    </Button>
  );
};

const EntryTypeCardUpdateButton = (props: { entryType: EntryType }) => {
  const dispatch = useAppDispatch();

  return <Button onClick={() => {}}>Update</Button>;
};

const EntryTypeCard = (props: { entryType: EntryType }) => {
  const { entryType } = props;
  return (
    <Card
      actions={[
        <EntryTypeCardUpdateButton entryType={entryType}></EntryTypeCardUpdateButton>,
        <EntryTypeCardDeleteButton entryType={entryType}></EntryTypeCardDeleteButton>,
      ]}
    >
      <Meta title={`${props.entryType.title} ${props.entryType.id}`} description={JSON.stringify(props.entryType)} />
    </Card>
  );
};

export default EntryTypeCard;
