import type { DemoStatsType } from '../../types/types';
import demoStatsCss from './demostats.module.scss';


const DemoStats = ({ icon, value, label }: DemoStatsType) => {
  return (
        <div className={`${demoStatsCss['lip-demoStats__box']}`}>
            <div className={`${demoStatsCss['lip-demoStats__icon-value']}`}>
                <img src={icon} alt="Contact" className={`${demoStatsCss['lip-demoStats__icon']}`}/>
                <p className={`${demoStatsCss['lip-demoStats__value']}`}>{value}</p>
            </div>
            <p className={`${demoStatsCss['lip-demoStats__label']}`}>
                {label}
            </p>
        </div>
  )
}

export default DemoStats;