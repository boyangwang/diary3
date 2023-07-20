import { List } from 'antd';
import { EntryType } from '../../app/types-constants';
import EntryTypeCard from './EntryTypeCard';

const EntryTypeListForCompletion = (props: { entryTypesArray: EntryType[] }) => (
  <List
    dataSource={props.entryTypesArray}
    renderItem={(item: EntryType) => (
      <List.Item>
        <EntryTypeCard entryType={item} isEdit={false} />
      </List.Item>
    )}
  />
);

export default EntryTypeListForCompletion;
