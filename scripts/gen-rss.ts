import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import yaml from 'js-yaml';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const SITE_URL = 'https://philipp.smponias.de';
const { window } = new JSDOM('');
const purify = DOMPurify(window);


// 1. Sicherer HTML-Sanitizer & Absolute URL Logic
const cleanAndAbsolute = (html: string) => {
  const sanitized = purify.sanitize(html);
  // Ersetze relative Pfade durch absolute (Security: Protokolle validieren)
  return sanitized.replace(
    /(src|href)="\/([^"]*)"/g, 
    (match, attr, path) => `${attr}="${SITE_URL}/${path}"`
  );
};

// 2. CDATA Protection
const safeCData = (content: string) => {
  return `<![CDATA[${content.replace(/]]>/g, ']]&gt;')}]]>`;
};

const blogDir = join(process.cwd(), 'content/blog');
const posts = readdirSync(blogDir)
  .filter(f => f.endsWith('.md'))
  .map(file => {
    const raw = readFileSync(join(blogDir, file), 'utf-8');
    const parts = raw.split('---');
    if (parts.length < 3) return null;

    try {
      // 3. Robustes YAML Parsing
      const data = yaml.load(parts[1]) as any;
      const contentMarkdown = parts.slice(2).join('---');
      const contentHtml = cleanAndAbsolute(marked.parse(contentMarkdown) as string);
      
      return {
        title: data.title || 'Untitled',
        date: data.date || new Date(),
        slug: file.replace('.md', ''),
        contentHtml
      };
    } catch (e) {
      return null;
    }
  }).filter(Boolean);

  const rssItems = posts.map(p => `
    <item>
      <title>${safeCData(p!.title)}</title>
      <link>${SITE_URL}/blog/${p!.slug}</link>
      <guid>${SITE_URL}/blog/${p!.slug}</guid>
      <pubDate>${new Date(p!.date).toUTCString()}</pubDate>
      <content:encoded>${safeCData(p!.contentHtml)}</content:encoded>
    </item>`).join('');

const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Mein Blog</title>
  <link>${SITE_URL}</link>
  <description>Software Engineering Blog</description>
  <language>de</language>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${rssItems}
</channel>
</rss>`;

writeFileSync(join(process.cwd(), 'public/rss.xml'), rssFeed);
console.log('✅ RSS Feed generiert: public/rss.xml');