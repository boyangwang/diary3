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
    <div className="flex flex-col items-center gap-2">
      {entryInstancesArray?.length
        ? entryInstancesArray.map((item) => {
            const { id, points, notes, entryTypeId, createdAt, updatedAt } = item;
            return (
              <div className="flex gap-4 rounded-lg border border-black/50 p-2 text-xs md:flex-wrap" key={id}>
                <div className="flex flex-col items-center gap-1">
                  ID<div>{id}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  entryTypeId
                  <div className="rounded-lg border border-black p-1"> {entryTypeId}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  points
                  <div className="font-DDin text-xl font-bold"> {points}</div>
                </div>
                <div className="flex  flex-col items-center gap-1">
                  notes
                  <div> {notes || <span className="text-gray-400">Empty</span>}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  createdAt
                  <div>{formatDate(createdAt)}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  updatedAt
                  <div>{formatDate(updatedAt)}</div>
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
