import "../styles/RegistrationForm.css";
import { useNavigate } from "react-router-dom";

export function RegistrationForm() {

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const product_name = e.currentTarget.product_name.value.trim();
    const product_desc = e.currentTarget.product_desc.value.trim();
    const product_price = e.currentTarget.product_price.value.trim();
    const product_tags = e.currentTarget.product_tags.value.split(",").map(tag => tag.trim()); 

    if (!product_name || !product_price) {
      console.error("상품명과 판매가격은 필수입니다.");
      return;  
    }

    const product_data = {
      name: product_name,
      description: product_desc,
      price: Number(product_price),
      tags: product_tags
    };

    fetch("https://backend-c2ut.onrender.com/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product_data)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data && data._id) {
        navigate(`/products/${data._id}`);
      } else {
        console.error("상품 등록에 실패하였습니다.", data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
  };


  return (
    <div className="registration_form">
      <form onSubmit={handleFormSubmit}>
        <div className="product_registration">
          <h2>상품 등록하기</h2>
          <button type="submit" className="registration_button">
            등록
          </button>
        </div>
        <div className="product_name">
          <label>상품명</label>
          <input 
            placeholder="상품명을 입력해주세요" 
            className="product_name_input" 
            type="text" 
            name="product_name" 
            required
          />
        </div>
        <div className="product_desc">
          <label>상품 소개</label>
          <input 
            placeholder="상품 소개를 입력해주세요" 
            className="product_desc_input" 
            type="text" 
            name="product_desc" 
          />
        </div>
        <div className="product_price">
          <label>판매가격</label>
          <input 
            placeholder="판매 가격을 입력해주세요" 
            className="product_price_input" 
            type="number" 
            name="product_price" 
            required
          />
        </div>
        <div className="product_tags">
          <label>태그 (쉼표로 구분)</label>
          <input 
            placeholder="태그를 입력해주세요" 
            className="product_tags_input" 
            type="text" 
            name="product_tags" 
          />
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
