import { Button, Card } from 'antd';
import { EntryType } from '../../app/types-constants';
import { deleteEntryType } from '../../app/entry-types-slice';
import { useAppDispatch } from '../../app/store';
import { enterEntryTypeEdit } from '../../app/ui-slice';
import './EntryTypeCard.css';
import EntryTypeCompletionForm from './EntryTypeCompletionForm';

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

  return <Button onClick={() => dispatch(enterEntryTypeEdit({ entryTypeId: props.entryType.id }))}>Update</Button>;
};

const editActions = (entryType: EntryType) => [
  <EntryTypeCardUpdateButton key="EntryTypeCardUpdateButton" entryType={entryType} />,
  <EntryTypeCardDeleteButton key="EntryTypeCardDeleteButton" entryType={entryType} />,
];

const EntryTypeCard = (props: { entryType: EntryType; isEdit: boolean }) => {
  const { entryType } = props;

  return (
    <Card
      actions={
        props.isEdit
          ? editActions(entryType)
          : [<EntryTypeCompletionForm key="EntryTypeCompletionForm" entryType={props.entryType} />]
      }
    >
      <Meta
        title={props.entryType.title}
        description={
          <div className="diary-entrytype-card-description">
            <span>id: {props.entryType.id}</span>
            <span>routine: {props.entryType.routine}</span>

            <span>defaultPoints: {props.entryType.defaultPoints}</span>
            <span>pointStep: {props.entryType.pointStep}</span>

            <span>createdAt: {props.entryType.createdAt}</span>
            <span>updatedAt: {props.entryType.updatedAt}</span>

            <span>themeColors: {JSON.stringify(props.entryType.themeColors)}</span>
          </div>
        }
      />
    </Card>
  );
};

export default EntryTypeCard;
