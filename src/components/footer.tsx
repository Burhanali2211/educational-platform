import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-muted-foreground">
              Empowering developers to learn, create, and share through interactive tutorials and real-world projects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/discord" className="text-muted-foreground hover:text-foreground transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="/github" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Developer's Mindset. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 