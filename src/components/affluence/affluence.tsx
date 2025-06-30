import rangeCss from './affluence.module.scss';

const Affluence = ({range, count}: {range: string; count: string;}) => {
  return (
    <div className={`${rangeCss["lip-affluence__wrap"]}`}>
      <div className={`${rangeCss["lip-affluence__range"]}`}>{range}</div>
      <div className={`${rangeCss["lip-affluence__count"]}`}>{count}</div>
    </div>
  )
}

export default Affluence;