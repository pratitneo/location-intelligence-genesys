import demoStatsCss from './demostats.module.scss';
import type { DemoStatsProps } from '../../types/types';


const DemoStats = ({ icon, value, label }: DemoStatsProps) => {
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