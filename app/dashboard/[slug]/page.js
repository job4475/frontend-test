export async function generateStaticParams() {
  const posts = await fetch('http://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}