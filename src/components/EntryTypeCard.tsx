import { Card } from 'antd';
import { EntryType } from '../types-constants';

const { Meta } = Card;

const EntryTypeCard = (props: { entryType: EntryType }) => (
  <Card cover={<div>Cover</div>} actions={['A', 'B', 'C']}>
    <Meta title="Card title" description={JSON.stringify(props.entryType)} />
  </Card>
);

export default EntryTypeCard;
