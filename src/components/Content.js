import "../styles/Content.css";
import "../images/Img_home_01.png";
import "../images/Img_home_02.png";
import "../images/Img_home_03.png";

export function Content() {

  const content_image_01 = require("../images/Img_home_01.png");
  const content_image_02 = require("../images/Img_home_02.png");
  const content_image_03 = require("../images/Img_home_03.png");

  return (
    <div className="content-container">
      <div className="content_container">
            <img className="images" src={content_image_01}/>
            <div className="content_01">
                <b className="content_badge">Hot Item</b>
                <p className="content_title">인기 상품을 <br/> 확인해 보세요</p>
                <p className="content_desc">가장 HOT한 중고거래 물품을 <br/> 판다 마켓에서 확인해 보세요</p>
            </div>
        </div>
        <div className="content_container">
            <div className="content_02">
                <b className="content_badge">Search</b>
                <p className="content_title">구매를 원하는 <br/> 상품을 검색하세요</p>
                <p className="content_desc">구매하고 싶은 물품은 검색해서 <br/> 쉽게 찾아보세요</p>
            </div>
            <img className="images" src={content_image_02}/>
        </div>
        <div className="content_container">
            <img className="images" src={content_image_03}/>
            <div className="content_03">
                <b className="content_badge">Register</b>
                <p className="content_title">판매를 원하는 <br/> 상품을 등록하세요</p>
                <p className="content_desc">어떤 물건이든 판매하고 싶은 상품을 <br/> 쉽게 등록하세요</p>
            </div>
        </div>
    </div>
  );
}

export default Content;import '../styles/Content.css';
import '../images/Img_home_01.png';
import '../images/Img_home_02.png';
import '../images/Img_home_03.png';

export function Content() {

  const content_image_01 = require("../images/Img_home_01.png");
  const content_image_02 = require("../images/Img_home_02.png");
  const content_image_03 = require("../images/Img_home_03.png");

  return (
    <div className="content-container">
      <div className="content_container">
            <img className="images" src={content_image_01}/>
            <div className="content_01">
                <b className="content_badge">Hot Item</b>
                <p className="content_title">인기 상품을 <br/> 확인해 보세요</p>
                <p className="content_desc">가장 HOT한 중고거래 물품을 <br/> 판다 마켓에서 확인해 보세요</p>
            </div>
        </div>
        <div className="content_container">
            <div className="content_02">
                <b className="content_badge">Search</b>
                <p className="content_title">구매를 원하는 <br/> 상품을 검색하세요</p>
                <p className="content_desc">구매하고 싶은 물품은 검색해서 <br/> 쉽게 찾아보세요</p>
            </div>
            <img className="images" src={content_image_02}/>
        </div>
        <div className="content_container">
            <img className="images" src={content_image_03}/>
            <div className="content_03">
                <b className="content_badge">Register</b>
                <p className="content_title">판매를 원하는 <br/> 상품을 등록하세요</p>
                <p className="content_desc">어떤 물건이든 판매하고 싶은 상품을 <br/> 쉽게 등록하세요</p>
            </div>
        </div>
    </div>
  );
}

export default Content;