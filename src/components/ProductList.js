import "./ProductList.css";
import icHeart from "../assets/ic-heart.png";

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

function ProductList({ isBest = false, items }) {
  const listLabel = isBest ? "베스트 상품" : "판매 중인 상품";
  const className = `items-list ${isBest ? "best" : ""}`;
  return (
    <div className="items-container">
      <div className="label">{listLabel}</div>
      <div className={className}>
        {items.map((item) => {
          return <ProductItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
