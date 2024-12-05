import { useNavigate } from "react-router-dom";
import "./RegistrationForm.css";
import icX from "../assets/ic-x.png";
import { useEffect, useState } from "react";
import { createProduct } from "../apis/ProductService.js";
import useCheckInputValid from "../hooks/useCheckInputValid.js";

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
  const [tags, setTags] = useState([]);
  const [loadingError, setloadingError] = useState(null);
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState(false);
  const btnClassName = `link-button ${isBtnActive ? "" : "disable"}`;
  const {
    inputValue: inputName,
    isValid: isValidName,
    isBeforeTouch: isBeforeTouchName,
    inputClassName: nameClassName,
    handleBlur: handleNameBlur,
    handleChange: handleNameChange,
  } = useCheckInputValid((value) => value.trim() !== "" && value.length <= 10);
  const {
    inputValue: inputDesc,
    isValid: isValidDesc,
    isBeforeTouch: isBeforeTouchDesc,
    inputClassName: descClassName,
    handleBlur: handleDescBlur,
    handleChange: handleDescChange,
  } = useCheckInputValid((value) => value.length >= 10 && value.length <= 100);
  const {
    inputValue: inputPrice,
    isValid: isValidPrice,
    isBeforeTouch: isBeforeTouchPrice,
    inputClassName: priceClassName,
    handleBlur: handlePriceBlur,
    handleChange: handlePriceChange,
  } = useCheckInputValid(
    (value) => value.trim() !== "" && Number.isInteger(Number(value))
  );
  const {
    inputValue: inputTag,
    isValid: isValidTag,
    isBeforeTouch: isBeforeTouchTag,
    inputClassName: tagClassName,
    handleBlur: handleTagBlur,
    handleChange: handleTagChange,
    handleReset: handleTagReset,
  } = useCheckInputValid((value) => value.length <= 5);

  const handleTagEnter = (e) => {
    if (
      inputTag && // 빈값이 아니고
      isValidTag && // 유효성 검증이 되고(5글자 이내)
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false // 한글 입력 시의 문제를 해결하기 위해 추가
    ) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, inputTag]); // 태그에 추가
      handleTagReset(); // 태그 input값 초기화
    }
  };

  // 태그 삭제
  const handleChipClick = (index) => {
    setTags((prevTags) => [
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]);
  };

  const handleCreateClick = async (e) => {
    if (isBtnActive) {
      // e.preventDefault();
      // const formData = new FormData();
      // formData.append("name", inputName);
      // formData.append("description", inputDesc);
      // formData.append("price", inputPrice);
      // formData.append("tags", tags);

      // // let result;
      // try {
      //   setloadingError(null);
      //   await createProduct(formData);
      //   navigate("/items/item");
      // } catch (e) {
      //   setloadingError(e);
      // }
      navigate("/items/item");
    }
  };

  // const formTag = document.getElementById("product-form");

  // const handleSubmit = (e) => {
  //   if (isBtnActive) {
  //     console.log("click submit!");
  //     e.preventDefault();
  //     // formTag.action = "https://four-sprint-mission-fe-1.onrender.com/products";
  //     formTag.method = "POST";
  //   }
  // };

  useEffect(() => {
    /**
     * '등록' 버튼 활성화 조건 체크
     * - 입력폼 최초 클릭 전인 경우 valid값과 상관없이 무조건 false(최초 페이지 로딩 시를 위한 처리)
     */
    if (
      !isBeforeTouchName &&
      isValidName &&
      !isBeforeTouchDesc &&
      isValidDesc &&
      !isBeforeTouchPrice &&
      isValidPrice &&
      tags.length > 0
    ) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [
    isBeforeTouchName,
    isBeforeTouchDesc,
    isBeforeTouchPrice,
    isValidName,
    isValidDesc,
    isValidPrice,
    tags,
  ]);

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
          className={nameClassName}
          value={inputName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          placeholder="상품명을 입력해주세요"
        />
        {!isValidName && (
          <div className="error-message">
            1자 이상 10자 이내로 입력해 주세요.
          </div>
        )}
        <div className="form-label">상품 소개</div>
        <textarea
          name="description"
          className={descClassName}
          value={inputDesc}
          onChange={handleDescChange}
          onBlur={handleDescBlur}
          placeholder="상품 소개를 입력해주세요"
        />
        {!isValidDesc && (
          <div className="error-message">
            10자 이상 100자 이내로 입력해 주세요.
          </div>
        )}
        <div className="form-label">판매 가격</div>
        <input
          name="price"
          className={priceClassName}
          value={inputPrice !== 0 ? inputPrice : ""}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          placeholder="판매 가격을 입력해주세요"
        />
        {!isValidPrice && (
          <div className="error-message">1자 이상 숫자로 입력해 주세요.</div>
        )}
        <div className="form-label">태그</div>
        <input
          name="tags"
          className={tagClassName}
          value={inputTag}
          onChange={handleTagChange}
          onBlur={handleTagBlur}
          onKeyDown={handleTagEnter}
          placeholder="태그를 입력해주세요"
        />
        {!isValidTag && (
          <div className="error-message">5글자 이내로 입력해 주세요.</div>
        )}
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