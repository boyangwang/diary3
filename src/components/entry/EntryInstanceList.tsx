import { Button, List } from 'antd';
import { deleteEntryInstance } from '../../app/entry-instances-slice';
import { useAppDispatch } from '../../app/store';
import { EntryInstance, formatDate } from '../../app/types-constants';

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

const EntryInstanceList = (props: { entryInstancesArray: EntryInstance[] }) => {
  const { entryInstancesArray } = props;
  console.log({ entryInstancesArray });
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {entryInstancesArray?.length
        ? entryInstancesArray.map((item) => {
            const { id, points, notes, entryTypeId, createdAt, updatedAt } = item;
            return (
              <div className="flex flex-col gap-1 rounded-lg border border-black/50 p-2" key={id}>
                <div className="flex items-center gap-4">
                  ID:
                  <div className="flex-grow"> {id}</div>
                </div>
                <div className="flex items-center gap-4">
                  entryTypeId:
                  <div className="flex-grow"> {entryTypeId}</div>
                </div>
                <div className="flex items-center gap-4">
                  points:
                  <div className="flex-grow"> {points}</div>
                </div>
                <div className="flex items-center gap-4">
                  notes:
                  <div className="flex-grow"> {notes || <span className="text-gray-400">Empty</span>}</div>
                </div>
                <div className="flex items-center gap-4">
                  createdAt:
                  <div className="flex-grow">{formatDate(createdAt)}</div>
                </div>
                <div className="flex items-center gap-4">
                  updatedAt:
                  <div className="flex-grow">{formatDate(updatedAt)}</div>
                </div>
                <EntryInstanceCardDeleteButton key={id} entryInstance={item} />
              </div>
            );
          })
        : null}
    </div>
    // <List
    //   dataSource={props.entryInstancesArray}
    //   renderItem={(item: EntryInstance) => (
    //     <List.Item key={item.id} actions={[<EntryInstanceCardDeleteButton key={item.id} entryInstance={item} />]}>
    //       <List.Item.Meta avatar={item.points} title={item.entryTypeId} description={item.notes} />
    //       <span>id: {item.id}</span>
    //       {/* <span>createdAt: {item.createdAt}</span>
    //       <span>updatedAt: {item.updatedAt}</span> */}
    //     </List.Item>
    //   )}
    // />
  );
};

export default EntryInstanceList;
