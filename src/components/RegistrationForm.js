import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import icX from "../assets/ic-x.png";
import { useState } from "react";
import { createProduct } from "../apis/ProductService.js";

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
    name: "",
    descripition: "",
    price: 0,
    tags: "",
  });
  const [tags, setTags] = useState([]);
  const [loadingError, setloadingError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target; // form의 각 input 요소에서 name/value를 가져옴
    setValues((prevValues) => ({ ...prevValues, [name]: value })); // 해당 name의 속성의 값을 대체
  };
  const handleTagEnter = (e) => {
    if (
      values.productTag && // 입력값이 있을 때만
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false // 한글 입력 시의 문제를 해결하기 위해 추가
    ) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, values.productTag]); // 태그에 추가
      setValues((prevValues) => ({ ...prevValues, productTag: "" })); // input 초기화
    }
  };
  const handleChipClick = (index) => {
    setTags((prevTags) => [...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const handleCreateClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("description", values.productDesc);
    formData.append("price", values.productPrice);
    formData.append("tags", tags);

    let result;
    try {
      setloadingError(null);
      result = await createProduct(formData);
      navigate("/items/item");
    } catch (e) {
      setloadingError(e);
    }
  };

  const formTag = document.getElementById("product-form");

  const handleSubmit = (e) => {
    e.preventDefault();
    formTag.action = "http://localhost:5500/products";
    formTag.method = "POST";
  };

  return (
    <div className="items-container">
      <div className="label-box regist">
        <span>상품 등록하기</span>
        <button className="link-button disable" onClick={handleCreateClick}>
          등록
        </button>
      </div>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <form
        id="product-form"
        action="https://four-sprint-mission-fe-1.onrender.com/products"
        method="POST"
        // onSubmit={handleSubmit}
      >
        <div className="form-label">상품명</div>
        <input
          name="name"
          className="product-input"
          value={values.productName}
          onChange={handleChange}
          placeholder="상품명을 입력해주세요"
        />
        <div className="form-label">상품 소개</div>
        <textarea
          name="description"
          className="product-input"
          value={values.productDesc}
          onChange={handleChange}
          placeholder="상품 소개를 입력해주세요"
        />
        <div className="form-label">판매 가격</div>
        <input
          name="price"
          className="product-input"
          value={values.productPrice !== 0 ? values.productPrice : ""}
          onChange={handleChange}
          placeholder="판매 가격을 입력해주세요"
        />
        <div className="form-label">태그</div>
        <input
          name="tags"
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
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
export default RegistrationForm;
