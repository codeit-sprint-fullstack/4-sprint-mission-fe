'use server';

import api from '@/api';
import { redirect } from 'next/navigation';

export async function postArticleAction(formData) {
  console.log(formData);
  const article = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const articleId = await api.postArticle(article);
  redirect(`/articles/${articleId}`);
}
