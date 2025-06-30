import drpDescCss from "./dropdownDesc.module.scss";

const DropownDesc = ({desc}: {desc: string}) => {
  return (
    <div className={`${drpDescCss["lip-drpDesc__wrap"]}`}>
      <p className={`${drpDescCss["lip-drpDesc__paraText"]}`}>{desc}</p>
    </div>
  );
};

export default DropownDesc;
