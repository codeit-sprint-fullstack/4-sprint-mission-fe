import "./HeaderNav.css";

const NAV_MENUS = [
  { id: 1, title: "자유게시판", link: "#" },
  { id: 2, title: "중고마켓", link: "#" },
];

function HeaderNav() {
  return (
    <div className="nav-container">
      {NAV_MENUS.map(({ id, title, link }) => {
        return (
          <span key={id} className="menu">
            <a href={link}>{title}</a>
          </span>
        );
      })}
    </div>
  );
}

export default HeaderNav;
