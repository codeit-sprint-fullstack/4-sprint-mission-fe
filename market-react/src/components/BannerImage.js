import "./BannerImage.css";
import imgBannerTop from "../assets/img-home-top.png";
import imgBannerBottom from "../assets/img-home-bottom.png";
import { Link } from "react-router-dom";

function BannerImage({ isTop }) {
  const img = isTop ? imgBannerTop : imgBannerBottom;
  const imgHeight = isTop ? "340px" : "375px";
  const text1 = isTop ? "일상의 모든 물건을 " : "믿을 수 있는";
  const text2 = isTop ? "거래해 보세요" : "판다마켓 중고 거래";

  return (
    <div className="image">
      <div className="image-content">
        <div className="image-content-left">
          <span>
            {text1}
            <br className="break-t1" />
            {text2}
          </span>
          {isTop && (
            <Link to="/items">
              <button type="button" className="button round">
                구경하러 가기
              </button>
            </Link>
          )}
        </div>
        <img src={img} width="745px" height={imgHeight} alt="top-banner" />
      </div>
    </div>
  );
}
export default BannerImage;