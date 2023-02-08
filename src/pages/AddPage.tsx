import EntryTypeForm from '../components/EntryTypeForm';
import HeaderDatetime from '../components/HeaderDatetime';
import StreaksTable from '../components/StreaksTable';

export default function AddPage() {
  return (
    <>
      <HeaderDatetime />
      <EntryTypeForm />
      <StreaksTable />
    </>
  );
}
