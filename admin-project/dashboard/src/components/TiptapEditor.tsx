import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Markdown } from 'tiptap-markdown';
import { useEffect } from 'react';

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
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-8 py-10',
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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* Basic Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
        >
          H3
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
