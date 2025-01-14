import Button from '@/components/Button';
import PageContainer from '@/components/Page';
import { postArticleAction } from '@/utils/actions';

function ArticlePostPage() {
  return (
    <PageContainer>
      <div>
        <form action={postArticleAction}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">게시글 쓰기</p>
            <Button>등록</Button>
          </div>
          <p className="text-lg font-bold mb-3">*제목</p>
          <p className="mb-6">
            <input
              type="text"
              id="title"
              name="title"
              required
              className="bg-[#f3f4f6] placeholder-gray-400 w-full h-14 rounded-lg px-6"
              placeholder="제목을 입력해주세요"
            />
          </p>
          <p className="text-lg font-bold mb-3">*내용</p>
          <textarea
            name="content"
            className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[282px] rounded-lg px-6 py-4"
            placeholder="내용을 입력해주세요"
          />
        </form>
      </div>
    </PageContainer>
  );
}

export default ArticlePostPage;
