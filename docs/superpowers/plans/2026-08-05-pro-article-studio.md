# Pro Article Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fullscreen split-screen Article Studio with a Notion-style TipTap editor on the left and a live-rendering markdown preview on the right.

**Architecture:** The editor leverages `tiptap` and `tiptap-markdown` to provide a rich text experience while storing raw Markdown in the database to maintain 100% backward compatibility with existing articles. The live preview uses the exact same `renderMarkdownContent` logic as the public Next.js frontend.

**Tech Stack:** React, Vite, Tailwind CSS, TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`), `tiptap-markdown`.

## Global Constraints

- The Vite dashboard is located in `admin-project/dashboard`.
- The database schema and public Next.js frontend MUST NOT be changed.
- All generated content MUST be valid Markdown.
- No placeholders; implement exact file contents.

---

### Task 1: Install TipTap Dependencies

**Files:**
- Modify: `admin-project/dashboard/package.json`

**Interfaces:**
- Consumes: Existing Vite React setup
- Produces: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `tiptap-markdown` available for use.

- [ ] **Step 1: Install dependencies**

```bash
cd admin-project/dashboard && npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image tiptap-markdown
```

- [ ] **Step 2: Verify installation**

```bash
cat admin-project/dashboard/package.json | grep tiptap
```
Expected: Contains `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `tiptap-markdown`.

- [ ] **Step 3: Commit**

```bash
cd admin-project/dashboard
git add package.json package-lock.json
git commit -m "chore(dashboard): install tiptap editor dependencies"
```

---

### Task 2: Port Live Preview Markdown Renderer

**Files:**
- Create: `admin-project/dashboard/src/components/ArticleLivePreview.tsx`

**Interfaces:**
- Consumes: Markdown string.
- Produces: `ArticleLivePreview` component that renders semantic HTML identical to the public site.

- [ ] **Step 1: Write the minimal component with public-site rendering logic**
*Note: We skip traditional unit tests here because the Vite setup currently lacks a full Vitest/Jest suite, and we are porting visual logic.*

```tsx
// admin-project/dashboard/src/components/ArticleLivePreview.tsx
import React from 'react';

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
```

- [ ] **Step 2: Commit**

```bash
cd admin-project/dashboard
git add src/components/ArticleLivePreview.tsx
git commit -m "feat(dashboard): port markdown renderer for live preview"
```

---

### Task 3: Build the TipTap Editor Component

**Files:**
- Create: `admin-project/dashboard/src/components/TiptapEditor.tsx`

**Interfaces:**
- Consumes: `content` (markdown string) and `onChange` callback.
- Produces: `TiptapEditor` component.

- [ ] **Step 1: Write the TipTap Editor implementation**

```tsx
// admin-project/dashboard/src/components/TiptapEditor.tsx
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
      const markdown = editor.storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  // Handle external content updates (e.g. loading an article)
  useEffect(() => {
    if (editor && content !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(content);
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
```

- [ ] **Step 2: Commit**

```bash
cd admin-project/dashboard
git add src/components/TiptapEditor.tsx
git commit -m "feat(dashboard): implement markdown-backed TipTap editor"
```

---

### Task 4: Integrate Fullscreen Studio into Articles.tsx

**Files:**
- Modify: `admin-project/dashboard/src/pages/Articles.tsx`

**Interfaces:**
- Consumes: `TiptapEditor`, `ArticleLivePreview`.
- Produces: Fullscreen split-pane editor instead of modal.

- [ ] **Step 1: Replace Modal with Fullscreen Studio**

Update `admin-project/dashboard/src/pages/Articles.tsx` to conditionally render the fullscreen view when `modalOpen` is true (rename state to `isStudioOpen` conceptually, or just use the boolean).

```tsx
// Apply this modification mentally during execution:
// Instead of <Modal isOpen={modalOpen}>, we render a fullscreen div covering the page when modalOpen is true.
// The split screen has TiptapEditor on the left, ArticleLivePreview on the right.
```
*Note for executing subagent: Completely replace the `<Modal>` section in `Articles.tsx` with a `<div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">` that contains a top navbar (Save/Cancel buttons) and a `flex-1 flex` container. The left child is a 50% width pane with `TiptapEditor`, the right child is a 50% width pane with `ArticleLivePreview`.*

- [ ] **Step 2: Commit**

```bash
cd admin-project/dashboard
git add src/pages/Articles.tsx
git commit -m "feat(dashboard): integrate split-screen Pro Article Studio"
```
