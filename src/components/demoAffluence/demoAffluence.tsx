import DrpdwnHead from '../drpdwnHead/drpdwnHead';
import demoAffluenceCSS from './demoAffluence.module.scss';
import { Images } from '../../assets/assets';
import type { SalaryBracket } from '../../types/types';
import Affluence from '../affluence/affluence';


// const salaryData: SalaryBracket[] = [
//   { range: "< ₹5 LPA", count: "14,000" },
//   { range: "₹6 – ₹10 LPA", count: "22,000" },
//   { range: "₹11 – ₹15 LPA", count: "13,000" },
//   { range: "₹15>", count: "7,400" },
// ];


const DemoAffluence = () => {
  const salaryData: SalaryBracket[] = [
    { range: "< ₹- LPA", count: "0" },
    { range: "₹- – ₹- LPA", count: "0" },
    { range: "₹- – ₹- LPA", count: "0" },
    { range: "₹- >", count: "0" },
  ];
  return (
    <div className={`${demoAffluenceCSS["lip-demoAffluence__wrap"]}`}>
      <DrpdwnHead icon={Images?.affluenceIcon} heading={"Affluence"} />
      <div className={`${demoAffluenceCSS["lip-demoAffluence__content"]}`}>
        {
          salaryData.map((item, index) => (
            <Affluence key={index} range={item?.range} count={item?.count} />
          ))
        }
      </div>
    </div>
  )
}

export default DemoAffluence;