import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Markdown } from 'tiptap-markdown';
import { useEffect } from 'react';
import { Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote } from 'lucide-react';

interface Props {
  content: string;
  onChange: (markdown: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Markdown,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-12 py-10',
      },
    },
    onUpdate: ({ editor }) => {
      // Extract markdown
      const storage = editor.storage as unknown as { markdown: { getMarkdown: () => string } };
      const markdown = storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  // Handle external content updates (e.g. loading an article)
  useEffect(() => {
    if (editor) {
      const storage = editor.storage as unknown as { markdown: { getMarkdown: () => string } };
      if (content !== storage.markdown.getMarkdown()) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Modern Toolbar */}
      <div className="border-b border-gray-200 bg-white p-2 flex gap-1 sticky top-0 z-10 shadow-sm flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('strike') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>

        <div className="w-px h-6 bg-gray-200 my-auto mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="w-px h-6 bg-gray-200 my-auto mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('orderedList') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-md transition-colors ${editor.isActive('blockquote') ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
