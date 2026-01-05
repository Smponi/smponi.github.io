import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Feed } from 'feed';

// Deine bestehende Logik (leicht angepasst für Node)
function parseFrontmatter(rawContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);
  if (!match) return { data: {} as any, content: rawContent };
  
  const data: any = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val) data[key.trim()] = val.join(':').trim().replace(/^['"](.*)['"]$/, '$1');
  });
  return { data, content: match[2] };
}

const SITE_URL = 'https://philipp.smponias.de';

const feed = new Feed({
  title: 'Mein Software Engineer Blog',
  description: 'Insights über Code, Tech und was mich so interessiert',
  id: SITE_URL,
  link: SITE_URL,
  language: 'de',
  copyright: `All rights reserved ${new Date().getFullYear()}`,
  generator: 'RSS Generator',
  feedLinks: { rss2: `${SITE_URL}/rss.xml` },
});

const blogDir = join(process.cwd(), 'content/blog');
const files = readdirSync(blogDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const raw = readFileSync(join(blogDir, file), 'utf-8');
  const { data, content } = parseFrontmatter(raw);
  
  if (data.published === 'false') return;

  const slug = file.replace('.md', '');
  const url = `${SITE_URL}/blog/${slug}`;

  feed.addItem({
    title: data.title || 'Untitled',
    id: url,
    link: url,
    description: data.description,
    content: content.slice(0, 500) + '...', // Kurzer Teaser
    date: new Date(data.date || Date.now()),
  });
});

// Schreibe die Datei in den public Ordner (wird von Vite nach dist kopiert)
writeFileSync(join(process.cwd(), 'public/rss.xml'), feed.rss2());
console.log('✅ RSS Feed generiert: public/rss.xml');