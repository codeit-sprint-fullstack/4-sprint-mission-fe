import Img_bottom from "../img/Img_home_bottom.svg";
import "./MainBottom.css";
export const MainBottom = () => {
  return (
    <div className="section2">
      <div className="section2_inner">
        <span className="text">
          믿을 수 있는 <br />
          판다마켓 중고 거래
        </span>

        <div className="img_box">
          <img className="img_panda" src={Img_bottom} alt="panda logo" />
        </div>
      </div>
    </div>
  );
};
