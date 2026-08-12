// Simplified port of renderMarkdownContent from Next.js
function renderMarkdownContent(text: string) {
  if (!text) return '';
  let html = text.replace(/\r\n/g, '\n');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-2xl my-8 object-cover border border-gray-200 shadow-sm" />');
  
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-10 mb-4 text-gray-900">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-extrabold mt-12 mb-5 text-gray-900">$1</h2>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Paragraphs
  html = html.replace(/^(?!<h|<img|<ul|<ol|<li)(.*$)/gim, (match) => {
    if (match.trim() === '') return '';
    return `<p class="text-gray-700 text-[17px] leading-[1.8] mb-6">${match}</p>`;
  });
  
  return html;
}

interface Props {
  title?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  readTime?: string;
}

export default function ArticleLivePreview({ title, content, coverImage, category, readTime }: Props) {
  return (
    <div className="bg-white min-h-full pb-20">
      {/* Hero Header */}
      <div className="w-full max-w-4xl mx-auto px-8 pt-12 pb-8">
        <div className="flex items-center gap-3 text-sm font-semibold text-[#D62828] mb-4">
          <span>{category || 'Uncategorized'}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{readTime || '5 min read'}</span>
        </div>
        <h1 className="text-[36px] leading-[1.2] font-extrabold text-gray-900 tracking-[-0.02em] mb-8 font-sans">
          {title || 'Judul Artikel Kosong'}
        </h1>
        {coverImage ? (
          <img src={coverImage} alt={title || 'Cover'} className="w-full aspect-[2/1] object-cover rounded-2xl shadow-sm border border-gray-100" />
        ) : (
          <div className="w-full aspect-[2/1] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-200 border-dashed">
            Tidak ada gambar cover
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-3xl mx-auto px-8 py-4">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdownContent(content || '') }} />
      </div>
    </div>
  );
}
