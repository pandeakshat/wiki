// src/pages/graph.json.ts
import { getCollection } from 'astro:content';

export async function GET() {
  const docs = await getCollection('docs');
  
  // Helper to clean the ID (remove .md/.mdx extensions for the URL)
  const cleanSlug = (id: string) => id.replace(/\.[^/.]+$/, "");

  const nodes = docs.map((doc) => {
    // USE doc.id instead of doc.slug
    const slug = cleanSlug(doc.id);
    return {
      id: slug,
      title: doc.data.title,
      // Group by the top-level folder (e.g., 'projects' or 'learnings')
      group: slug.split('/')[0] || 'main',
    };
  });

  const links: { source: string; target: string }[] = [];
  const linkRegex = /\[.*?\]\((?:\/docs\/)?(.*?)\)/g;

  docs.forEach((doc) => {
    // Safety check: ensure body exists before scanning
    if (doc.body) {
      const sourceSlug = cleanSlug(doc.id);
      let match;
      while ((match = linkRegex.exec(doc.body)) !== null) {
        // match[1] is the link target (e.g., "projects/my-project")
        // We trim slashes and extensions to ensure it matches the node IDs
        const targetRaw = match[1].replace(/^\/|\/$/g, '');
        const target = targetRaw.replace(/\.[^/.]+$/, "");

        // Only add the link if the target actually exists in our nodes
        if (nodes.find((n) => n.id === target)) {
          links.push({
            source: sourceSlug,
            target: target,
          });
        }
      }
    }
  });

  return new Response(JSON.stringify({ nodes, links }), {
    headers: { 'Content-Type': 'application/json' },
  });
}