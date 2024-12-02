import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import icX from "../assets/ic-x.png";
import { useEffect, useState } from "react";
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
  const [checkActiveValues, setCheckActiveValues] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });
  const [isBtnActive, setIsBtnActive] = useState(false);
  const btnClassName = `link-button ${isBtnActive ? "" : "disable"}`;

  // form값이 입력되면 checkActiveValues의 해당 key 값을 true로, 빈 값일 경우 fasle로
  function checkFormIsEmpty(inputName, inputValue) {
    if (inputName !== "tags") {
      if (inputValue !== "") {
        setCheckActiveValues((prevValues) => ({
          ...prevValues,
          [inputName]: true,
        }));
      } else {
        setCheckActiveValues((prevValues) => ({
          ...prevValues,
          [inputName]: false,
        }));
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target; // form의 각 input 요소에서 name/value를 가져옴
    setValues((prevValues) => ({ ...prevValues, [name]: value })); // 해당 name의 속성의 값을 대체
    checkFormIsEmpty(name, value); // 입력값이 변경될 때마다 check
  };

  const handleTagEnter = (e) => {
    if (
      values.tags && // 입력값이 있을 때만
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false // 한글 입력 시의 문제를 해결하기 위해 추가
    ) {
      // tag가 추가되면 checkActiveValues의 tags 값을 true로
      setCheckActiveValues((prevValues) => ({
        ...prevValues,
        tags: true,
      }));
      e.preventDefault();
      setTags((prevTags) => [...prevTags, values.tags]); // 태그에 추가
      // setValues((prevValues) => ({ ...prevValues, tags: "" })); // input 초기화
      e.target.value = "";
      checkFormIsEmpty();
    }
  };

  const handleChipClick = (index) => {
    setTags((prevTags) => [
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]);
    // 마지막 태그가 삭제되면 checkActiveValues의 값을 false로
    if (index === 0) {
      setCheckActiveValues((prevValues) => ({
        ...prevValues,
        tags: false,
      }));
    }
  };

  const handleCreateClick = async (e) => {
    if (isBtnActive) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.descripition);
      formData.append("price", values.price);
      formData.append("tags", tags);

      let result;
      try {
        setloadingError(null);
        result = await createProduct(formData);
        navigate("/items/item");
      } catch (e) {
        setloadingError(e);
      }
      // navigate("/items/item");
    }
  };

  const formTag = document.getElementById("product-form");

  const handleSubmit = (e) => {
    if (isBtnActive) {
      console.log("click submit!");
      e.preventDefault();
      // formTag.action = "https://four-sprint-mission-fe-1.onrender.com/products";
      formTag.method = "POST";
    }
  };

  useEffect(() => {
    if (!Object.values(checkActiveValues).some((value) => value === false)) {
      console.log(`do setIsBtnActive true`);
      setIsBtnActive(true);
    } else {
      console.log(`do setIsBtnActive false`);
      setIsBtnActive(false);
    }
  }, [checkActiveValues]);

  return (
    <div className="items-container">
      <div className="label-box regist">
        <span>상품 등록하기</span>
        <button className={btnClassName} onClick={handleCreateClick}>
          등록
        </button>
      </div>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <form
        id="product-form"
        // action="https://four-sprint-mission-fe-1.onrender.com/products"
        // action="http://localhost:5500/products"
        // method="POST"
        // onSubmit={handleSubmit}
        // target="/items"
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
        {/* <button type="submit">전송</button> */}
      </form>
      <iframe name="blankIfr" style={{ display: "none" }} title="dk"></iframe>
    </div>
  );
}
export default RegistrationForm;
