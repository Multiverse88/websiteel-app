"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import React, { useEffect } from 'react'
import { Bold, Italic, Strikethrough, List, ListOrdered, ImageIcon } from 'lucide-react'

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export default function RichTextEditor({ content, onChange, onImageUpload }: RichTextEditorProps) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageUpload = async (file: File) => {
    if (!onImageUpload) return null;
    setIsUploading(true);
    try {
      const url = await onImageUpload(file);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-4 bg-white',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageUpload(file).then((url) => {
              if (url) {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                if (coordinates) {
                  const node = schema.nodes.image.create({ src: url });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                }
              }
            });
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
          const file = event.clipboardData.files[0];
          if (file.type.startsWith('image/')) {
            event.preventDefault();
            handleImageUpload(file).then((url) => {
              if (url) {
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              }
            });
            return true;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const addImage = () => {
    if (onImageUpload) {
      fileInputRef.current?.click();
    } else {
      const url = window.prompt('URL Gambar (Atau URL dari fitur upload MinIO Anda):')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = await handleImageUpload(file);
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
      {isUploading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="text-[#990202] font-bold text-[14px] flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-[#990202] border-t-transparent animate-spin"></div>
            Mengunggah gambar...
          </div>
        </div>
      )}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
          title="Tambah Gambar"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="text-[16px] text-gray-800 relative">
        <EditorContent editor={editor} />
        {!content && <div className="absolute inset-0 pointer-events-none p-4 text-gray-400 opacity-50">Tulis isi email atau drag & drop gambar ke sini...</div>}
      </div>
    </div>
  )
}
