"use server";

export async function incrementView(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles/${slug}/view`;
    await fetch(apiUrl, { method: 'POST' });
  } catch {
    // Silently fail - don't break the page
  }
}
