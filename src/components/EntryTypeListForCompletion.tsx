import { List } from 'antd';
import { EntryType } from '../app/types-constants';
import EntryTypeCard from './EntryTypeCard';

const EntryTypeList = (props: { entryTypeList: EntryType[] }) => (
  <List
    dataSource={props.entryTypeList}
    renderItem={(item: EntryType) => (
      <List.Item>
        <EntryTypeCard entryType={item} />
      </List.Item>
    )}
  />
);

export default EntryTypeList;
