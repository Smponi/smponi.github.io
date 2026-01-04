export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
  published: boolean
  content: string
  readingTime: number
}

/**
 * Blog Frontmatter Schema
 *
 * Jede .md Datei in /content/blog/ muss diesen Header haben:
 *
 * ---
 * title: "Mein Blog Post Titel"
 * date: "2025-01-04"
 * tags: ["Android", "Kotlin", "Mobile"]
 * description: "Kurze Beschreibung des Posts für die Vorschau"
 * published: true
 * ---
 *
 * Keys:
 * - title (required): Titel des Blog-Eintrags
 * - date (required): Datum im Format YYYY-MM-DD
 * - tags (required): Array von Stichwoertern/Keywords
 * - description (required): Kurze Beschreibung (1-2 Saetze)
 * - published (optional): true/false, default true. false = Entwurf
 */
