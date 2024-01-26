import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const searchQuery: string | null = url.searchParams.get('query');
  if (searchQuery === null) {
    return new Response(
      JSON.stringify({
        error: 'Query param is missing',
      }),{
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });}
const allBlogArticle: CollectionEntry<'blog'>[] = await getCollection(
    'blog'
  );
const searchRes = allBlogArticle.filter(article => {
    const titleMatch: boolean = article.data.title
    .toLowerCase()
    .includes(searchQuery!.toLowerCase());

    const bodyMatch: boolean = article.body
    .toLowerCase()
    .includes(searchQuery!.toLowerCase());

    const slugMatch: boolean = article.slug
    .toLowerCase()
    .includes(searchQuery!.toLowerCase());

    return titleMatch || bodyMatch || slugMatch
})
  return new Response(JSON.stringify(searchRes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};