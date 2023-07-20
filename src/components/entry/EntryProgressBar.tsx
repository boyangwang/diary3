import { Progress } from 'antd';
import './EntryProgressBar.css';

function EntryProgressBar(props: { points: number }) {
  const points = props.points;
  const percent = Math.ceil((points * 10000) / 24) / 100;
  const gradient = {
    '0%': '#3385E4',
    '25%': '#6CD261',
    '50%': '#F2DB2D',
    '75%': '#EA7E30',
    '100%': '#924FDA',
  };
  return (
    <div className="diary-entry-progress-bar">
      <Progress percent={percent} status="active" strokeColor={gradient} format={(percent) => props.points} />
    </div>
  );
}

export default EntryProgressBar;
