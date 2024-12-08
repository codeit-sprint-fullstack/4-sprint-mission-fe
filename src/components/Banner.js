import "../styles/Banner.css";

export function Banner(children) {
  return (
    <div class="banner_container">
            <div class="banner_info">
                <p class="banner_text">{children.toptext}</p>
                <p class="banner_text">{children.bottomtext}</p>
                {children.link && (
                    <a href="items.html">
                        <button className="look_around_button">구경하러 가기</button>
                        {children.link.label}
                    </a>
                )}
                
            </div>
            <img class="banner_image" src={children.image}/>
        </div>
  );
}

export default Banner;