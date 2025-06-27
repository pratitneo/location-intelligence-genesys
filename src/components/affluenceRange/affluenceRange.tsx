import RangeCSS from './affluenceRange.module.scss';

const AffluenceRange = ({range, count}: {range: string; count: string;}) => {
  return (
    <div className={`${RangeCSS["lip-affluenceRange__wrap"]}`}>
      <div className={`${RangeCSS["lip-affluenceRange__range"]}`}>{range}</div>
      <div className={`${RangeCSS["lip-affluenceRange__count"]}`}>{count}</div>
    </div>
  )
}

export default AffluenceRange;