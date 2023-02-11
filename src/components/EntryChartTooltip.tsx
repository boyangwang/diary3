import { isNumOrStrAndNotNaN } from '../app/types-constants';

function shallowEqual(a: any, b: any) {
  for (const key in a) {
    if ({}.hasOwnProperty.call(a, key) && (!{}.hasOwnProperty.call(b, key) || a[key] !== b[key])) {
      return false;
    }
  }
  for (const key in b) {
    if ({}.hasOwnProperty.call(b, key) && !{}.hasOwnProperty.call(a, key)) {
      return false;
    }
  }
  return true;
}

export interface TooltipPayload {
  name: string;
  value: string | number | Array<string | number>;
  unit?: string;
  color?: string;
  fill?: string;
}
const defaultFormatter = (value: any) =>
  Array.isArray(value) && isNumOrStrAndNotNaN(value[0]) && isNumOrStrAndNotNaN(value[1]) ? value.join(' ~ ') : value;

type EntryChartTooltipProps = {
  filter: (tooltipPayload: TooltipPayload) => boolean;
  separator: string;
  formatter: any;
  wrapperStyle: any;
  itemStyle: any;
  labelStyle: any;
  labelFormatter: any;
  label: any;
  payload: TooltipPayload[];
  itemSorter: (a: TooltipPayload, b: TooltipPayload) => 0 | 1 | -1;
};
const PropsDefaults = {
  separator: ' : ',
  itemStyle: {},
  labelStyle: {},
};

function EntryChartToolip(props: EntryChartTooltipProps) {
  const { labelStyle, label, labelFormatter, wrapperStyle } = props;
  const finalStyle = {
    margin: 0,
    padding: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    whiteSpace: 'nowrap',
    ...wrapperStyle,
  };
  const finalLabelStyle = {
    margin: 0,
    ...labelStyle,
  };
  const hasLabel = typeof label === 'number' || typeof label === 'string';
  let finalLabel = hasLabel ? label : '';

  if (hasLabel && labelFormatter) {
    finalLabel = labelFormatter(label);
  }

  function renderContent() {
    const { payload, separator, formatter, itemStyle, itemSorter, filter } = props;

    if (payload && payload.length) {
      const listStyle = { padding: 0, margin: 0 };

      const items = payload.sort(itemSorter).map((entry, i) => {
        const finalItemStyle = {
          display: 'block',
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || '#000',
          ...itemStyle,
        };
        const hasName = isNumOrStrAndNotNaN(entry.name);
        const finalFormatter = formatter || defaultFormatter;

        if (filter && !filter(entry)) {
          return null;
        }

        return (
          <li className="recharts-tooltip-item" key={`tooltip-item-${i}`} style={finalItemStyle}>
            {hasName ? <span className="recharts-tooltip-item-name">{entry.name}</span> : null}
            {hasName ? <span className="recharts-tooltip-item-separator">{separator}</span> : null}
            <span className="recharts-tooltip-item-value">
              {finalFormatter ? finalFormatter(entry.value, entry.name, entry, i) : entry.value}
            </span>
            <span className="recharts-tooltip-item-unit">{entry.unit || ''}</span>
          </li>
        );
      });

      return (
        <ul className="recharts-tooltip-item-list" style={listStyle}>
          {items}
        </ul>
      );
    }

    return null;
  }

  return (
    <div className="recharts-default-tooltip" style={finalStyle}>
      <p className="recharts-tooltip-label" style={finalLabelStyle}>
        {finalLabel}
      </p>
      {renderContent()}
    </div>
  );
}
export default EntryChartToolip;
