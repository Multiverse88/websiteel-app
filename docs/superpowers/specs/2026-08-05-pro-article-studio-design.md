# Pro Article Studio Design

## Objective
Replace the current modal-based Article CRUD with a fullscreen "Pro Article Studio" featuring a split-screen layout. The left pane will be a Notion-style Rich Text Editor (TipTap), and the right pane will be a high-fidelity live preview rendering exact public website styles.

## Scope
- **Target App:** Vite Admin Dashboard (`admin-project/dashboard/src/pages/Articles.tsx`).
- **Target Backend/Database:** Unchanged.
- **Target Public Frontend:** Unchanged.

## Architecture & Data Flow
1. **Editor Bridge:**
   - Use `tiptap` core with starter kit, placeholder, and image extensions.
   - Use a markdown-bridge (e.g., `tiptap-markdown` or custom parsing) so TipTap natively reads and writes Markdown.
2. **Data Consistency (Backward Compatibility):**
   - When loading an existing article, raw Markdown is injected into TipTap and converted to visual blocks.
   - When saving, TipTap's JSON state is serialized back to raw Markdown. 
   - No database schema changes are required. The Next.js frontend will continue to use its existing `renderMarkdownContent` function safely.
3. **Live Preview Rendering:**
   - To achieve high-fidelity preview without iframe delays, we will duplicate the core CSS patterns and the `renderMarkdownContent` function from the Next.js app (`src/app/artikel/[slug]/page.tsx`) into a new dashboard component (`ArticleLivePreview.tsx`).
   - As the user types in TipTap, the generated Markdown is instantly passed to `renderMarkdownContent` in the right pane.

## UI / Layout
1. **List View:**
   - The main `Articles.tsx` page remains a data table.
   - Clicking "Edit" or "Buat Artikel Baru" hides the table and mounts the fullscreen Studio view (or navigates to a sub-route).
2. **Studio View:**
   - **Top Navbar:** Back button ("Kembali ke Daftar"), Input fields for Title, Slug, Category, and Cover Image, plus Save/Publish buttons.
   - **Main Body (Split-screen):**
     - **Left Pane:** Minimalist TipTap editor canvas (auto-expanding, no distracting borders).
     - **Right Pane:** Read-only rendered Markdown with styling identical to the public site (DM Sans, appropriate prose styling, blockquotes, etc.).

## Open Questions & Edge Cases
- **Image Uploading:** The TipTap image extension will need a custom handler. We will intercept image drops/pastes, upload them to MinIO via the existing `api.uploadMedia`, and insert the CDN URL into the editor as a markdown image `![alt](url)`.
- **Table of Contents (ToC):** The public site auto-generates ToC. The Live Preview pane should ideally show this ToC accurately to give full context.

## Action Plan
1. Install TipTap dependencies (`@tiptap/react`, `@tiptap/starter-kit`, `tiptap-markdown`, etc.) in the dashboard project.
2. Port `renderMarkdownContent` from Next.js to the dashboard for the Live Preview.
3. Build the split-screen Studio UI components.
4. Integrate MinIO image uploading into the editor's drag-and-drop/toolbar.
