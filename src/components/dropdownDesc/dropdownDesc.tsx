import drpDescCss from "./dropdownDesc.module.scss";

const DropownDesc = () => {
  return (
    <div className={`${drpDescCss["lip-drpDesc__wrap"]}`}>
      <p className={`${drpDescCss["lip-drpDesc__paraText"]}`}>Bandra East scores 7/10 for site suitability, driven by strong youth presence, high footfall, and affluent population pockets</p>
    </div>
  );
};

export default DropownDesc;
