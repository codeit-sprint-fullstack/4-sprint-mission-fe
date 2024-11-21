import "./ProductList.css";
import icHeart from "../assets/ic-heart.png";
import DropDown from "./DropDown";

function ProductItem({ item }) {
  const { images, name, price, favoriteCount } = item;
  return (
    <div className="item">
      {/* <img src={images[0]} alt={name} /> */}
      <div
        className="item-image"
        style={{ backgroundImage: `url(${images[0]})` }}
      ></div>
      <p className="item-name">{name}</p>
      <p className="item-price">{`${price}원`}</p>
      <div className="item-favorite">
        <img src={icHeart} alt="heart" />
        {favoriteCount}
      </div>
    </div>
  );
}

function ProductList({ isBest = false, items, value, onClick, onSubmit }) {
  const listLabel = isBest ? "베스트 상품" : "판매 중인 상품";
  const itemClassName = `items-list ${isBest ? "best" : ""}`;
  const labelClassName = `label-box ${isBest ? "best" : ""}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    onSubmit(e.target.search.value);
  };

  return (
    <div className="items-container">
      <div className={labelClassName}>
        <div className="label-title">{listLabel}</div>
        <form onSubmit={handleSubmit}>
          <input
            name="search"
            className="label-input"
            placeholder="검색할 상품을 입력해주세요"
          />
        </form>
        <a className="button" href="#">
          상품 등록하기
        </a>
        <DropDown value={value} onClick={onClick} />
      </div>

      <div className={itemClassName}>
        {items.map((item) => {
          return <ProductItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
