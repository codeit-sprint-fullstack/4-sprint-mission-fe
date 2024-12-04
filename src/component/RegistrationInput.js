import { useEffect, useState } from "react";
import "./RegistrationInput.css";

const INITAIL_FORMDATA = {
  name: "",
  description: "",
  price: "",
  tag: "",
};

export const RegistrationInput = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState(INITAIL_FORMDATA);
  const [invalidMessage, setInvalidMessage] = useState(INITAIL_FORMDATA);

  useEffect(() => {
    isValid();
  }, [formData]);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    // 글자가 없거나 모자르게 입력했는데 blur 했을때 함수
    const { name, value } = e.target;
    if (name === "name" || name === "tag") {
      if (value.length === 0) {
        setInvalidMessage((prev) => ({
          ...prev,
          [name]: "글자를 입력해주세요",
        }));
      }
    } else if (name === "description") {
      if (value.length < 10) {
        setInvalidMessage((prev) => ({
          ...prev,
          [name]: "10자 이상 입력해주세요",
        }));
      }
    } else if (name === "price") {
      if (value.length === 0) {
        setInvalidMessage((prev) => ({
          ...prev,
          [name]: "숫자를 입력해주세요",
        }));
      }
    }
  };

  const isValid = () => {
    let vaild = true;
    let newMessage = { ...invalidMessage };
    if (formData.name.length < 1 || formData.name.length > 10) {
      if (formData.name.length > 10) {
        newMessage.name = "10자 이내로 입력해주세요";
      }

      vaild = false;
    } else {
      newMessage.name = "";
    }
    if (formData.description.length < 10 || formData.description.length > 100) {
      if (formData.description.length > 100) {
        newMessage.description = "100자 이내로 입력해주세요";
      }

      vaild = false;
    } else {
      newMessage.description = "";
    }
    if (!Number.isInteger(Number(formData.price))) {
      if (
        !Number.isInteger(Number(formData.price)) &&
        formData.price.length !== 0
      ) {
        newMessage.price = "숫자를 입력해주세요 test";
      }
      vaild = false;
    } else {
      newMessage.price = "";
    }
    if (formData.tag.length < 1 || formData.tag.length > 5) {
      if (formData.tag.length > 5) {
        newMessage.tag = "5자 이내로 입력해주세요";
      }
      vaild = false;
    } else {
      newMessage.tag = "";
    }

    setIsActive(vaild);
    setInvalidMessage(newMessage);
  };

  return (
    <div className="registrationSection">
      <form className="registrationContainer">
        <div className="buttonSection">
          상품등록하기
          <button disabled={!isActive} className="button">
            등록
          </button>
        </div>
        <div className="inputContainer">
          <div>
            <p>상품명</p>
            <input
              className="menuInput"
              placeholder="상품명을 입력해주세요"
              name="name"
              value={formData.name}
              onChange={handleValueChange}
              onBlur={handleBlur}
            ></input>
            {invalidMessage.name && (
              <p className="errorMessage">{invalidMessage.name}</p>
            )}
          </div>
          <div>
            <p>상품 소개</p>
            <textarea
              className="menuInput textarea"
              placeholder="상품 소개를 입력해주세요"
              name="description"
              value={formData.description}
              onChange={handleValueChange}
              onBlur={handleBlur}
            ></textarea>
            {invalidMessage.description && (
              <p className="errorMessage">{invalidMessage.description}</p>
            )}
          </div>
          <div>
            <p>판매가격</p>
            <input
              className="menuInput"
              placeholder="판매 가격을 입력해주세요"
              name="price"
              value={formData.price}
              onChange={handleValueChange}
              onBlur={handleBlur}
            ></input>
            <p className="errorMessage">{invalidMessage.price}</p>
          </div>
          <div>
            <p>태그</p>
            <input
              className="menuInput"
              placeholder="태그를 입력해주세요"
              name="tag"
              value={formData.tag}
              onChange={handleValueChange}
              onBlur={handleBlur}
            ></input>
            <p className="errorMessage">{invalidMessage.tag}</p>
          </div>
        </div>
      </form>
    </div>
  );
};
