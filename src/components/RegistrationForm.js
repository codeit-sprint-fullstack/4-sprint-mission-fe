import { Link } from "react-router-dom";
import "./RegistrationForm.css";
import icX from "../assets/ic-x.png";

function Tag() {
  return (
    <div className="product-tag">
      <span>#티셔츠</span>
      <div className="icon-circle">
        <img src={icX} alt="delete tag" />
      </div>
    </div>
  );
}

function RegistrationForm() {
  return (
    <div className="items-container">
      <div className="label-box regist">
        <span>상품 등록하기</span>
        <Link className="link-button disable">등록</Link>
      </div>
      <form className="product-form">
        <div className="form-label">상품명</div>
        <input
          name="productTile"
          className="product-input"
          placeholder="상품명을 입력해주세요"
        />
        <div className="form-label">상품명</div>
        <textarea
          name="productIntro"
          className="product-input"
          placeholder="상품 소개를 입력해주세요"
        />
        <div className="form-label">판매가격</div>
        <input
          name="productPrice"
          className="product-input"
          placeholder="판매 가격을 입력해주세요"
        />
        <div className="form-label">태그</div>
        <input
          name="productTag"
          className="product-input"
          placeholder="태그를 입력해주세요"
        />
        <Tag />
      </form>
    </div>
  );
}
export default RegistrationForm;
