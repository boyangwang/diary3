import { Button, List } from 'antd';
import { deleteEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryInstance } from '../../app/types-constants';

const EntryInstanceCardDeleteButton = (props: { entryInstance: EntryInstance }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      danger
      onClick={() => {
        dispatch(deleteEntryInstance(props.entryInstance));
      }}
    >
      Delete
    </Button>
  );
};

const EntryInstanceList = (props: { entryInstancesArray: EntryInstance[] }) => (
  <List
    dataSource={props.entryInstancesArray}
    renderItem={(item: EntryInstance) => (
      <List.Item key={item.id} actions={[<EntryInstanceCardDeleteButton key={item.id} entryInstance={item} />]}>
        <List.Item.Meta avatar={item.points} title={item.entryTypeId} description={item.notes} />
        <span>id: {item.id}</span>
        <span>createdAt: {item.createdAt}</span>
        <span>updatedAt: {item.updatedAt}</span>
      </List.Item>
    )}
  />
);

export default EntryInstanceList;
