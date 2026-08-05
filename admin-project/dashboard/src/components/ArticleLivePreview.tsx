// Simplified port of renderMarkdownContent from Next.js
function renderMarkdownContent(text: string) {
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
  markdown: string;
}

export default function ArticleLivePreview({ markdown }: Props) {
  return (
    <div className="prose prose-lg max-w-none px-8 py-10 bg-white">
      <div dangerouslySetInnerHTML={{ __html: renderMarkdownContent(markdown) }} />
    </div>
  );
}
