import "./SellingProduct.css";
import noImage from "../img/noImage.jpg";
import ic_heart from "../img/ic_heart.svg";

export const SellingProduct = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  return (
    <div className="sellingProduct">
      <div className="SellingProductSection">
        <div className="SellingProductList">
          {items.map((item, index) => (
            <SellingProductList key={index} item={item}></SellingProductList>
          ))}
        </div>
      </div>
    </div>
  );
};

const SellingProductList = ({ item }) => {
  const imageUrl = item.images ? item.images : noImage;
  const handleImageError = (e) => {
    e.target.src = noImage; // 이미지가 없으면 기본 이미지로 설정
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt={item.name}
        className="SellingProduct-img"
        onError={handleImageError}
      />
      <div>
        <p className="itemName">{`${item.name} 팝니다`}</p>
        <p className="itemPrice">{`${item.price.toLocaleString("ko-KR")}원`}</p>{" "}
        <span className="favorite">
          <img src={ic_heart} alt="heartIcon" />
          <p className="itemFavorite">{item.favoriteCount}</p>
        </span>
      </div>
    </div>
  );
};
