import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Blog | Developer\'s Mindset',
  description: 'Explore our latest articles about web development, programming, and tech.',
};

// Revalidate the page every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image || '/blog/default-cover.svg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author.name}</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 