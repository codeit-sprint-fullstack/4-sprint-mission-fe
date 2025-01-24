import Image from "next/image";
import defualtImage from "@/assets/svg/img_default.svg";
import heart from "@/assets/svg/ic_heart.svg";
import profile from "@/assets/svg/ic_profile.svg";

function Article({ article }) {
  const createDate = article.createdAt;
  let date = createDate.split("T")[0];
  return (
    <div className="w-full flex flex-col bg-[#F9FAFB] border-b border-[#E5E7EB] pb-6">
      {/* 제목과 이미지지 */}
      <div className="flex justify-between">
        <p className="text-[20px] font-semibold">{article.title}</p>
        <div className="w-[72px] h-[72px] rounded-md border-b border-[#E5E7Eb] flex justify-center items-center bg-white">
          <Image
            src={defualtImage.src}
            width={48}
            height={44.57}
            alt="defualtImage"
          />
        </div>

        {/* 하단 부분 */}
      </div>
      <div className="flex justify-between align-bottom">
        <div className="flex gap-2">
          <Image src={profile.src} width={24} height={24} alt="profile" />
          <p className="text-[14px] text-[#4B5563]">총명한 판다</p>
          <p className="text-[#9CA3AF]">{date}</p>
        </div>

        <span className="flex gap-2 text-[#6B7280]">
          <Image src={heart.src} width={16} height={16} alt="heart" />
          {article.favoriteCount}
        </span>
      </div>
    </div>
  );
}

export default Article;
