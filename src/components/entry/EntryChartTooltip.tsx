import { isNumOrStrAndNotNaN } from '../../app/types-constants';

function shallowEqual(a: any, b: any) {
  for (const key in a) {
    if (Object.hasOwn(a, key) && (!Object.hasOwn(b, key) || a[key] !== b[key])) {
      return false;
    }
  }
  for (const key in b) {
    if (Object.hasOwn(b, key) && !Object.hasOwn(a, key)) {
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

interface EntryChartTooltipProps {
  filter: (tooltipPayload: TooltipPayload) => boolean;
  separator?: string;
  formatter?: any;
  wrapperStyle?: any;
  itemStyle?: any;
  labelStyle?: any;
  labelFormatter?: any;
  label?: any;
  // XXX to be fixed
  payload?: any;
  // itemSorter: (a: TooltipPayload, b: TooltipPayload) => 0 | 1 | -1;
}
const PropsDefaults = {
  itemStyle: {},
  labelStyle: {},
};

function EntryChartToolip(props: EntryChartTooltipProps) {
  const { label, labelFormatter, wrapperStyle } = props;
  let { labelStyle } = props;
  if (!labelStyle) {
    labelStyle = {};
  }

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
    const { payload, formatter, filter } = props;
    let { separator } = props;
    if (!separator) {
      separator = ' : ';
    }
    let { wrapperStyle } = props;
    if (!wrapperStyle) {
      wrapperStyle = {};
    }
    let { itemStyle } = props;
    if (!itemStyle) {
      itemStyle = {};
    }

    if (payload?.length) {
      const listStyle = { padding: 0, margin: 0 };

      const items = payload
        .sort((a: any, b: any) => b.value - a.value)
        .map((entry: any, i: number) => {
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
