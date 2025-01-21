'use server';

import api from '@/api';
import { redirect } from 'next/navigation';

export async function postArticleAction(formData) {
  const article = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const articleId = await api.postArticle(article);
  redirect(`/articles/${articleId}`);
}

export async function editArticleAction(formData) {
  const article = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const articleId = await api.postArticle(article);
  redirect(`/articles/${articleId}`);
}
