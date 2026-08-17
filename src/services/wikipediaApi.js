/**
 * Free Wikipedia REST & Search API Service
 * Used for fetching live plant, crop, seed, and agricultural information without any API keys.
 */

export async function searchWikipedia(query) {
  if (!query || !query.trim()) return [];
  
  try {
    const searchTerm = `${query.trim()} agriculture plant crop seed`;
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&utf8=&format=json&origin=*&srlimit=8`;
    
    const res = await fetch(searchUrl);
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    
    const data = await res.json();
    const results = data.query?.search || [];
    
    return results.map(item => ({
      pageid: item.pageid,
      title: item.title,
      snippet: item.snippet.replace(/<[^>]*>?/gm, ''), // Strip HTML tags
      wordcount: item.wordcount
    }));
  } catch (err) {
    console.error('Wikipedia search error:', err);
    return [];
  }
}

export async function fetchPlantDetails(title) {
  if (!title) return null;
  
  try {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(summaryUrl);
    
    if (!res.ok) return null;
    const data = await res.json();
    
    return {
      title: data.title,
      description: data.description || 'Agricultural plant species',
      extract: data.extract || 'No extract available.',
      thumbnail: data.thumbnail?.source || null,
      originalImage: data.originalimage?.source || null,
      wikiUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      lang: data.lang || 'en'
    };
  } catch (err) {
    console.error('Wikipedia summary error:', err);
    return null;
  }
}
