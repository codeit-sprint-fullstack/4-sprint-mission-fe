import { Link } from "react-router-dom";
import "./RegistrationForm.css";
import icX from "../assets/ic-x.png";
import { useState } from "react";

function TagChip({ value, onClick, chipIdx }) {
  const handleClick = () => {
    onClick(chipIdx);
  };
  return (
    <div className="product-tag-chip" onClick={handleClick}>
      <span>{value}</span>
      <div className="icon-circle">
        <img src={icX} alt="delete tag" />
      </div>
    </div>
  );
}

function RegistrationForm() {
  const [values, setValues] = useState({
    productName: "",
    productDesc: "",
    productPrice: 0,
    productTag: "",
  });
  const [tags, setTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target; // form의 각 input 요소에서 name/value를 가져옴
    setValues((prevValues) => ({ ...prevValues, [name]: value })); // 해당 name의 속성의 값을 대체
  };
  const handleTagEnter = (e) => {
    if (
      values.productTag &&
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false // 한글 입력 시의 문제를 해결하기 위해 추가
    ) {
      setTags((prevTags) => [...prevTags, values.productTag]); // 태그에 추가
      setValues((prevValues) => ({ ...prevValues, productTag: "" })); // input 초기화
    }
  };
  const handleChipClick = (index) => {
    setTags((prevTags) => [...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  return (
    <div className="items-container">
      <div className="label-box regist">
        <span>상품 등록하기</span>
        <Link className="link-button disable">등록</Link>
      </div>
      <form className="product-form">
        <div className="form-label">상품명</div>
        <input
          name="productName"
          className="product-input"
          value={values.productName}
          onChange={handleChange}
          placeholder="상품명을 입력해주세요"
        />
        <div className="form-label">상품 소개</div>
        <textarea
          name="productDesc"
          className="product-input"
          value={values.productDesc}
          onChange={handleChange}
          placeholder="상품 소개를 입력해주세요"
        />
        <div className="form-label">판매 가격</div>
        <input
          name="productPrice"
          className="product-input"
          value={values.productPrice !== 0 ? values.productPrice : ""}
          onChange={handleChange}
          placeholder="판매 가격을 입력해주세요"
        />
        <div className="form-label">태그</div>
        <input
          name="productTag"
          className="product-input"
          value={values.productTag}
          onChange={handleChange}
          onKeyDown={handleTagEnter}
          placeholder="태그를 입력해주세요"
        />
        {tags.map((tag, i) => {
          return (
            <TagChip
              value={tag}
              key={i}
              onClick={handleChipClick}
              chipIdx={i}
            />
          );
        })}
      </form>
    </div>
  );
}
export default RegistrationForm;
