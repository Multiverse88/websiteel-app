

import React, { useState, useRef, useTransition, useEffect } from "react";
import { api } from "../lib/api";
import AICompanionGuide, { type AICompanionGuidance } from "../components/AICompanionGuide";

import { Home, Sparkles, Image as ImageIcon, Upload, Link2, X, Check, FileText, Loader2, ExternalLink, Cloud, Activity, CheckCircle, AlertTriangle, XCircle, Table as TableIcon } from "lucide-react";





// Image Presets for premium aesthetics
const IMAGE_PRESETS = [
  {
    name: "Gedung Korporat",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Dokumen & Kerja",
    url: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Diskusi Bisnis",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Konsultasi Hukum",
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fit=crop&w=800&h=500&q=80"
  }
];

type CoverMode = "upload" | "url";

type GuidanceTarget = "title" | "excerpt" | "content" | "keyword";
type ReviewMode = "complete" | "seo" | "legal" | "readability" | "conversion";
type VerificationNotice = "checking" | "done" | null;

// Single source of truth for field -> companion targetId/label, shared by the
// companionGuidance builder and by every "mark as resolved" call site. Using
// one map everywhere prevents the resolved-key format from drifting out of
// sync with the filter (e.g. "content" vs "article-content-editor").
const FIELD_TARGET_MAP: Record<GuidanceTarget, { targetId: string; label: string }> = {
  title: { targetId: "title", label: "Judul artikel" },
  excerpt: { targetId: "excerpt", label: "Kutipan singkat" },
  content: { targetId: "article-content-editor", label: "Isi artikel" },
  keyword: { targetId: "focusKeyword", label: "Kata kunci utama" },
};

// Same key format used everywhere a guidance item is checked or marked
// resolved — must stay identical or "sudah diterapkan" silently stops working.
const guidanceResolvedKey = (targetId: string, message: string) =>
  `${targetId}::${(message || "").slice(0, 80)}`;

// Autosaved draft for a NEW article (not used in edit mode — an existing
// article's data always comes from the server, never from this slot).
// Refreshing mid-write would otherwise lose everything typed so far.
const NEW_ARTICLE_DRAFT_KEY = "el-article-draft-new";

type NewArticleDraft = {
  title: string;
  slug: string;
  slugManuallyEdited: boolean;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  focusKeyword: string;
  site: string;
  coverMode: CoverMode;
  coverUrl: string;
  faqItems: { q: string; a: string }[];
};

type EditorSnapshot = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  focusKeyword: string;
  /** What triggered this snapshot (e.g., "AI edit: ganti teks judul") */
  description: string;
  /** Timestamp */
  timestamp: number;
};

const slugifyArticleTitle = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

function inferGuidanceTarget(declaredField: unknown, message: string): GuidanceTarget {
  const normalized = message.toLowerCase();
  const fieldTerms: Array<{ field: GuidanceTarget; terms: string[] }> = [
    { field: "title", terms: ["judul", "headline", "title"] },
    { field: "excerpt", terms: ["kutipan", "meta description", "meta deskripsi", "deskripsi meta", "excerpt"] },
    { field: "keyword", terms: ["kata kunci", "keyword", "frasa kunci"] },
    { field: "content", terms: ["isi artikel", "struktur artikel", "kerangka", "subjudul", "paragraf", "konten", "pembahasan"] },
  ];

  const detected = fieldTerms
    .flatMap(({ field, terms }) => terms.map((term) => ({ field, index: normalized.indexOf(term) })))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)[0]?.field;

  if (detected) return detected;
  return ["title", "excerpt", "content", "keyword"].includes(String(declaredField))
    ? declaredField as GuidanceTarget
    : "content";
}

function wrapExistingImages(container: HTMLElement) {
  container.querySelectorAll("img").forEach(img => {
    if (img.closest(".img-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "img-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.margin = "16px 0";
    const overlay = document.createElement("div");
    overlay.className = "img-overlay";
    overlay.innerHTML = `<button type="button" data-img-action="edit" class="img-btn img-btn-edit">Ganti</button><button type="button" data-img-action="delete" class="img-btn img-btn-delete">Hapus</button>`;
    img.parentNode?.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
  });
}

export default function ArticleEditor() {
  const [articleId, setArticleId] = useState<string | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Cover image state
  const [coverMode, setCoverMode] = useState<CoverMode>("upload");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(IMAGE_PRESETS[0].url);
  const [coverUrl, setCoverUrl] = useState(IMAGE_PRESETS[0].url);
  const [isDragging, setIsDragging] = useState(false);

  // Form states for Live Preview
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState("Legalitas PT");
  const [readTime, setReadTime] = useState("5 menit baca");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [site, setSite] = useState("easylegal.biz.id");
  const [aiReview, setAiReview] = useState<any>(null);
  const [aiReviewLoading, setAiReviewLoading] = useState(false);
  const [aiReviewError, setAiReviewError] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("complete");
  const [dismissedEditKeys, setDismissedEditKeys] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("ai-dismissed-edits") || "[]"); } catch { return []; }
  });
  // Track which guidance items have been applied/resolved — persisted per article
  const [resolvedGuidanceKeys, setResolvedGuidanceKeys] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("ai-resolved-guidance") || "[]")); } catch { return new Set(); }
  });
  const [editorHistory, setEditorHistory] = useState<EditorSnapshot[]>([]);
  const [verificationNotice, setVerificationNotice] = useState<VerificationNotice>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const aiReviewRequestRef = useRef(0);
  const verificationPendingRef = useRef(false);

  // FAQ shown at the end of the article on the public site (reuses the
  // same <FAQ> component as the /layanan pages). Per-article, unlike the
  // global header/footer which live in Dashboard > Settings.
  const [faqItems, setFaqItems] = useState<{ q: string; a: string }[]>([]);

  // Link insertion state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedSelectionRef = useRef<{ range: Range; rect: DOMRect | null } | null>(null);

  // Image insertion state
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const editingImageRef = useRef<HTMLImageElement | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const analyzeSEO = () => {
    const checks = [];
    let score = 0;
    let totalChecks = 7;

    const keyword = focusKeyword.trim().toLowerCase();
    const contentText = content.toLowerCase();
    const titleText = title.toLowerCase();
    const excerptText = excerpt.toLowerCase();

    // 1. Content length
    const wordCount = contentText.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 300) {
      checks.push({ type: "success", text: `Panjang konten bagus (${wordCount} kata). Minimal 300 kata direkomendasikan.` });
      score++;
    } else {
      checks.push({ type: "error", text: `Panjang konten hanya ${wordCount} kata. Disarankan minimal 300 kata.` });
    }

    // 2. Title length
    if (title.length >= 30 && title.length <= 60) {
      checks.push({ type: "success", text: `Panjang judul sangat baik (${title.length} karakter).` });
      score++;
    } else if (title.length > 0) {
      checks.push({ type: "warning", text: `Panjang judul ${title.length} karakter. Disarankan antara 30-60 karakter.` });
    } else {
      checks.push({ type: "error", text: "Judul belum diisi." });
    }

    // 3. Excerpt length
    if (excerpt.length >= 120 && excerpt.length <= 160) {
      checks.push({ type: "success", text: `Panjang kutipan (meta deskripsi) sangat baik (${excerpt.length} karakter).` });
      score++;
    } else if (excerpt.length > 0) {
      checks.push({ type: "warning", text: `Panjang kutipan ${excerpt.length} karakter. Disarankan antara 120-160 karakter.` });
    } else {
      checks.push({ type: "error", text: "Kutipan belum diisi." });
    }

    // 4. Keyword presence
    if (keyword) {
      totalChecks += 3;
      
      if (titleText.includes(keyword)) {
         checks.push({ type: "success", text: "Kata kunci utama ditemukan pada Judul." });
         score++;
      } else {
         checks.push({ type: "error", text: "Kata kunci utama tidak ditemukan pada Judul." });
      }

      if (excerptText.includes(keyword)) {
         checks.push({ type: "success", text: "Kata kunci utama ditemukan pada Kutipan (Excerpt)." });
         score++;
      } else {
         checks.push({ type: "error", text: "Kata kunci utama tidak ditemukan pada Kutipan (Excerpt)." });
      }

      const keywordCount = (contentText.match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      if (keywordCount > 0) {
         checks.push({ type: "success", text: `Kata kunci utama ditemukan di dalam konten (${keywordCount} kali).` });
         score++;
      } else {
         checks.push({ type: "error", text: "Kata kunci utama tidak ditemukan di dalam isi artikel." });
      }
    } else {
      checks.push({ type: "warning", text: "Tentukan Kata Kunci Utama (Focus Keyword) untuk analisis lebih dalam." });
    }

    // 5. Headings
    if (content.includes("### ") || content.includes("<h3")) {
      checks.push({ type: "success", text: "Artikel memiliki sub-judul (H3) yang baik untuk struktur." });
      score++;
    } else {
      checks.push({ type: "warning", text: "Gunakan sub-judul (H3) untuk menstruktur artikel." });
    }

    // 6. Links
    if (content.includes("](") || content.includes("<a ")) {
      checks.push({ type: "success", text: "Artikel memiliki tautan (link)." });
      score++;
    } else {
      checks.push({ type: "warning", text: "Disarankan untuk menambahkan tautan internal/eksternal." });
    }

    // 7. Images (Inline or Cover)
    if (content.includes("![") || content.includes("<img ") || coverFile || coverUrl) {
      checks.push({ type: "success", text: "Artikel memiliki gambar (cover/inline)." });
      score++;
    } else {
      checks.push({ type: "warning", text: "Tambahkan gambar agar artikel lebih menarik." });
    }

    const percentage = Math.round((score / totalChecks) * 100);
    let status = "Buruk";
    let statusColor = "text-red-600";
    let bgIconColor = "bg-red-100 text-red-600";
    let bgCardColor = "bg-white border-red-200";

    if (percentage >= 80) {
      status = "Sangat Baik";
      statusColor = "text-emerald-600";
      bgIconColor = "bg-emerald-100 text-emerald-600";
      bgCardColor = "bg-white border-emerald-200";
    } else if (percentage >= 50) {
      status = "Cukup";
      statusColor = "text-amber-600";
      bgIconColor = "bg-amber-100 text-amber-600";
      bgCardColor = "bg-white border-amber-200";
    }

    return { checks, percentage, status, statusColor, bgIconColor, bgCardColor };
  };

  const seoData = analyzeSEO();
  const visibleEditOperations = (aiReview?.editOperations || []).filter(
    (edit: any) => !dismissedEditKeys.includes([edit.field, edit.operation, edit.targetText, edit.replacementText].join("::")),
  );

  const companionGuidance: AICompanionGuidance[] = (() => {
    if (!aiReview) return [];

    const targetMap = FIELD_TARGET_MAP;
    type FieldKey = keyof typeof targetMap;

    // Priority order: critical > warning > suggestion
    const severityRank: Record<string, number> = { critical: 3, warning: 2, suggestion: 1 };

    // Collect all candidates, then pick best per field
    const allCandidates: Array<AICompanionGuidance & { fieldKey: FieldKey; rank: number }> = [];

    const addCandidate = (item: AICompanionGuidance, fieldKey: FieldKey) => {
      allCandidates.push({ ...item, fieldKey, rank: severityRank[item.severity] || 1 });
    };

    // 1. Empty field detection — always show if field is empty
    const emptyFields: FieldKey[] = [];
    if (!title.trim()) emptyFields.push("title");
    if (!excerpt.trim()) emptyFields.push("excerpt");
    if (!content.trim()) emptyFields.push("content");
    if (!focusKeyword.trim()) emptyFields.push("keyword");

    emptyFields.forEach((fieldKey) => {
      const emptyMessages: Record<FieldKey, string> = {
        title: "Judul artikel belum diisi. Tulis judul yang jelas, memuat kata kunci utama, dan menarik perhatian pembaca.",
        excerpt: "Kutipan singkat (meta deskripsi) belum diisi. Tulis rangkuman 120-160 karakter yang menjelaskan manfaat artikel.",
        content: "Isi artikel belum ditulis. Mulai dengan paragraf pembuka yang menjelaskan topik, lalu kembangkan dengan subjudul.",
        keyword: "Kata kunci utama belum ditentukan. Masukkan frasa yang ingin dioptimasi agar AI bisa memberikan saran SEO yang tepat.",
      };
      addCandidate({
        ...targetMap[fieldKey],
        message: emptyMessages[fieldKey],
        severity: fieldKey === "content" ? "critical" : "warning",
        location: targetMap[fieldKey].label,
        problem: `${targetMap[fieldKey].label} masih kosong.`,
        action: `Isi bagian ${targetMap[fieldKey].label.toLowerCase()} sebelum menerbitkan artikel.`,
      }, fieldKey);
    });

    // 2. Duplicate / cannibalization warnings
    const closestDuplicate = aiReview.duplicateCheck?.results?.[0];
    if (closestDuplicate && aiReview.duplicateCheck?.risk !== "low") {
      const dupField: FieldKey = closestDuplicate.contentSimilarity > closestDuplicate.titleSimilarity ? "content" : "title";
      addCandidate({
        ...targetMap[dupField],
        message: closestDuplicate.keywordCannibalization
          ? `Artikel "${closestDuplicate.matchedTitle}" menargetkan keyword yang sama. Hapus salah satu atau bedakan target keyword.`
          : `Gunakan sudut pembahasan yang berbeda dari "${closestDuplicate.matchedTitle}" (${Math.round(closestDuplicate.similarity * 100)}% mirip).`,
        severity: aiReview.duplicateCheck.risk === "high" ? "critical" : "warning",
        location: targetMap[dupField].label,
        problem: closestDuplicate.keywordCannibalization
          ? `Keyword "${closestDuplicate.matchedFocusKeyword}" digunakan di dua artikel — ini keyword cannibalization.`
          : `Draft memiliki kemiripan ${Math.round(closestDuplicate.similarity * 100)}% dengan artikel "${closestDuplicate.matchedTitle}".`,
        action: "Ubah fokus utama, urutan pembahasan, dan contoh agar artikel menjawab kebutuhan pembaca dari sudut yang berbeda.",
        reason: "Mencegah dua artikel bersaing untuk topik yang sama dan mengurangi risiko konten duplikat.",
      }, dupField);
    }

    // 2b. Copywriting similarity check
    if (aiReview.copywritingCheck && aiReview.copywritingCheck.risk !== "low") {
      const copyField: FieldKey = "content";
      addCandidate({
        ...targetMap[copyField],
        message: aiReview.copywritingCheck.message || `Terdeteksi penggunaan frasa template yang terlalu umum (${aiReview.copywritingCheck.risk === "high" ? "tinggi" : "sedang"}).`,
        severity: aiReview.copywritingCheck.risk === "high" ? "warning" : "suggestion",
        location: "Copywriting",
        problem: aiReview.copywritingCheck.matches?.length > 0
          ? `Frasa yang terlalu mirip: "${aiReview.copywritingCheck.matches[0].matchedText}" (sumber: ${aiReview.copywritingCheck.matches[0].originalSource})`
          : "Artikel menggunakan terlalu banyak frasa template umum.",
        action: aiReview.copywritingCheck.matches?.length > 0
          ? aiReview.copywritingCheck.matches[0].suggestion
          : "Ganti frasa template dengan bahasa yang lebih spesifik dan unik.",
        reason: "Konten yang unik lebih menarik pembaca dan mesin pencari.",
      }, copyField);
    }

    // 2c. Tone consistency check
    if (aiReview.toneCheck && aiReview.toneCheck.overall !== "consistent") {
      const toneField: FieldKey = "content";
      addCandidate({
        ...targetMap[toneField],
        message: aiReview.toneCheck.message || `Konsistensi tone artikel perlu diperbaiki (${aiReview.toneCheck.overall === "inconsistent" ? "banyak perubahan" : "ada beberapa bagian"}).`,
        severity: aiReview.toneCheck.overall === "inconsistent" ? "warning" : "suggestion",
        location: "Tone & Gaya Penulisan",
        problem: aiReview.toneCheck.issues?.length > 0
          ? `Bagian "${aiReview.toneCheck.issues[0].location}": ${aiReview.toneCheck.issues[0].problem}`
          : "Tone artikel tidak konsisten di beberapa bagian.",
        action: aiReview.toneCheck.issues?.length > 0
          ? aiReview.toneCheck.issues[0].suggestion
          : "Gunakan tone formal-profesional yang konsisten di seluruh artikel.",
        reason: "Tone yang konsisten membangun kepercayaan pembaca terhadap profesionalisme EasyLegal.",
      }, toneField);
    }

    // 3. Edit operations (safe auto-apply candidates)
    visibleEditOperations.slice(0, 3).forEach((edit: any) => {
      const fk = edit.field as FieldKey;
      if (targetMap[fk]) {
        addCandidate({
          ...targetMap[fk],
          message: edit.reason || "Ada perubahan siap diterapkan pada bagian ini.",
          severity: "suggestion",
          location: targetMap[fk].label,
          problem: `Teks saat ini: "${edit.targetText}"`,
          action: edit.operation === "insert_after"
            ? "Tambahkan teks rekomendasi tepat setelah bagian yang ditunjuk."
            : edit.operation === "delete"
              ? "Hapus teks yang ditunjuk karena tidak lagi diperlukan."
              : "Ganti teks yang ditunjuk dengan versi rekomendasi.",
          example: edit.replacementText,
          reason: edit.reason,
          targetText: edit.targetText,
        }, fk);
      }
    });

    // 4. AI guidance items
    if (Array.isArray(aiReview.guidance) && aiReview.guidance.length > 0) {
      aiReview.guidance
        .filter((item: any) => item && typeof item.message === "string" && item.message.trim())
        .slice(0, 5)
        .forEach((item: any) => {
          const target = inferGuidanceTarget(item.field, item.message) as FieldKey;
          if (targetMap[target]) {
            addCandidate({
              ...targetMap[target],
              message: item.message,
              severity: ["suggestion", "warning", "critical"].includes(item.severity) ? item.severity : "suggestion",
              location: item.location,
              problem: item.problem,
              action: item.action,
              example: item.example,
              reason: item.reason,
            }, target);
          }
        });
    }

    // 5. Fallback: recommended title, meta, outline, keyword (only if field has no candidate yet)
    const fieldsWithCandidates = new Set(allCandidates.map((c) => c.fieldKey));
    if (!fieldsWithCandidates.has("title") && aiReview.recommendedTitle) {
      addCandidate({ ...targetMap.title, message: `Contoh judul yang bisa langsung dipakai: "${aiReview.recommendedTitle}"`, severity: "suggestion" }, "title");
    }
    if (!fieldsWithCandidates.has("excerpt") && aiReview.recommendedMetaDescription) {
      addCandidate({ ...targetMap.excerpt, message: `Contoh kutipan: "${aiReview.recommendedMetaDescription}"`, severity: "suggestion" }, "excerpt");
    }
    if (!fieldsWithCandidates.has("keyword") && aiReview.targetKeyword) {
      addCandidate({ ...targetMap.keyword, message: `Contoh kata kunci utama: "${aiReview.targetKeyword}"`, severity: "suggestion" }, "keyword");
    }
    if (!fieldsWithCandidates.has("content") && Array.isArray(aiReview.recommendedOutline) && aiReview.recommendedOutline.length > 0) {
      addCandidate({ ...targetMap.content, message: `Contoh struktur artikel: ${aiReview.recommendedOutline.join(" → ")}`, severity: "suggestion" }, "content");
    }

    // PICK BEST per field: highest severity wins, first occurrence breaks ties
    const bestPerField = new Map<FieldKey, AICompanionGuidance>();
    for (const candidate of allCandidates) {
      const existing = bestPerField.get(candidate.fieldKey);
      if (!existing || candidate.rank > (severityRank[(existing as any).severity] || 1)) {
        bestPerField.set(candidate.fieldKey, candidate);
      }
    }

    // Return in fixed order: title → excerpt → content → keyword (skip empty candidates)
    const fieldOrder: FieldKey[] = ["title", "excerpt", "content", "keyword"];
    return fieldOrder
      .map((fk) => bestPerField.get(fk))
      .filter((item): item is AICompanionGuidance => Boolean(item))
      // Filter out resolved guidance — applied suggestions won't reappear
      .filter((item) => !resolvedGuidanceKeys.has(guidanceResolvedKey(item.targetId, item.message)));
  })();

  useEffect(() => {
    if (!articleId && !slugManuallyEdited) setSlug(slugifyArticleTitle(title));
  }, [title, articleId, slugManuallyEdited]);

  useEffect(() => {
    if (verificationNotice !== "done") return;
    const timer = window.setTimeout(() => setVerificationNotice(null), 4000);
    return () => window.clearTimeout(timer);
  }, [verificationNotice]);

  // Persist dismissed edit keys to localStorage so rejected suggestions don't reappear
  useEffect(() => {
    try { localStorage.setItem("ai-dismissed-edits", JSON.stringify(dismissedEditKeys)); } catch { /* quota exceeded */ }
  }, [dismissedEditKeys]);

  // Persist resolved guidance keys — applied suggestions won't reappear
  useEffect(() => {
    try { localStorage.setItem("ai-resolved-guidance", JSON.stringify([...resolvedGuidanceKeys])); } catch { /* quota exceeded */ }
  }, [resolvedGuidanceKeys]);

  // AI Companion membaca perubahan secara otomatis. Debounce mencegah request
  // dikirim pada setiap ketikan, sementara request ID mencegah respons lama
  // menimpa pendapat untuk versi tulisan yang lebih baru.
  useEffect(() => {
    const requestId = ++aiReviewRequestRef.current;

    // Trigger AI review when at least title is filled (even without content)
    if (!title.trim()) {
      setAiReview(null);
      setAiReviewError(null);
      setAiReviewLoading(false);
      return;
    }

    // Skip re-scanning if every guidance item from the last scan has already
    // been resolved (applied/used-example/dismissed) — avoids re-reviewing a
    // section that was just fixed. Key must use targetId (via FIELD_TARGET_MAP),
    // matching what applyAIEdit/applyGuidanceExample/onDismiss actually store.
    if (aiReview && aiReview.guidance?.length > 0) {
      const allGuidanceResolved = aiReview.guidance.every((g: any) => {
        const targetId = FIELD_TARGET_MAP[g.field as GuidanceTarget]?.targetId || g.field;
        return resolvedGuidanceKeys.has(guidanceResolvedKey(targetId, g.message || ""));
      });
      if (allGuidanceResolved) {
        setAiReviewLoading(false);
        return;
      }
    }

    setAiReviewLoading(true);
    setAiReviewError(null);

    const timeoutId = window.setTimeout(async () => {
      try {
        const result = await api.aiReview({
          title,
          excerpt,
          content,
          site,
          keyword: focusKeyword || undefined,
          existingSlug: originalSlug || undefined,
          reviewMode,
          resolvedSuggestions: [...resolvedGuidanceKeys],
        });

        if (aiReviewRequestRef.current === requestId) {
          setAiReview(result);
          if (verificationPendingRef.current) {
            verificationPendingRef.current = false;
            setVerificationNotice("done");
          }
        }
      } catch (err: any) {
        if (aiReviewRequestRef.current === requestId) {
          setAiReviewError(err.message || "AI Companion belum bisa memberi pendapat. Ubah tulisan untuk mencoba lagi.");
          if (verificationPendingRef.current) {
            verificationPendingRef.current = false;
            setVerificationNotice(null);
          }
        }
      } finally {
        if (aiReviewRequestRef.current === requestId) {
          setAiReviewLoading(false);
        }
      }
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [title, excerpt, content, focusKeyword, originalSlug, reviewMode]);

  useEffect(() => {
    const match = window.location.hash.match(/\?id=([^&]+)/);
    if (match) {
      const id = match[1];
      setArticleId(id);
      api.getArticle(id).then(article => {
        if (article) {
          setTitle(article.title || "");
          setSlug(article.slug || slugifyArticleTitle(article.title || ""));
          setOriginalSlug(article.slug || null);
          setCategory(article.category || "Legalitas PT");
          setReadTime(article.readTime || "5 min read");
          setExcerpt(article.excerpt || "");
          setFocusKeyword(article.focusKeyword || "");
          setContent(article.content || "");
          setCoverUrl(article.coverImage || IMAGE_PRESETS[0].url);
          setCoverMode("url");
          setFaqItems(Array.isArray(article.faq) ? article.faq : []);
          
          if (editorRef.current) {
            editorRef.current.innerHTML = markdownToHtml(article.content || "");
            wrapExistingImages(editorRef.current);
          }
        }
      }).catch(console.error);
    } else {
      // New article — restore an autosaved draft if one exists, so a
      // refresh (or an accidental tab close) doesn't lose what was typed.
      let restoredContent = content;
      try {
        const raw = localStorage.getItem(NEW_ARTICLE_DRAFT_KEY);
        const draft: Partial<NewArticleDraft> | null = raw ? JSON.parse(raw) : null;
        if (draft) {
          if (typeof draft.title === "string") setTitle(draft.title);
          if (typeof draft.slug === "string") setSlug(draft.slug);
          if (typeof draft.slugManuallyEdited === "boolean") setSlugManuallyEdited(draft.slugManuallyEdited);
          if (typeof draft.category === "string") setCategory(draft.category);
          if (typeof draft.readTime === "string") setReadTime(draft.readTime);
          if (typeof draft.excerpt === "string") setExcerpt(draft.excerpt);
          if (typeof draft.focusKeyword === "string") setFocusKeyword(draft.focusKeyword);
          if (typeof draft.site === "string") setSite(draft.site);
          if (draft.coverMode === "upload" || draft.coverMode === "url") setCoverMode(draft.coverMode);
          if (typeof draft.coverUrl === "string") setCoverUrl(draft.coverUrl);
          if (Array.isArray(draft.faqItems)) setFaqItems(draft.faqItems);
          if (typeof draft.content === "string") {
            restoredContent = draft.content;
            setContent(draft.content);
          }
        }
      } catch { /* corrupt draft — ignore, start blank */ }

      if (editorRef.current && !editorRef.current.innerHTML) {
        editorRef.current.innerHTML = markdownToHtml(restoredContent || "");
        wrapExistingImages(editorRef.current);
      }
    }
  }, []);

  // Autosave the in-progress draft for a NEW article only — an existing
  // article being edited is never written here, so this slot can't leak
  // stale/wrong content into the next "create article" session.
  useEffect(() => {
    if (articleId) return;
    const draft: NewArticleDraft = {
      title, slug, slugManuallyEdited, category, readTime, excerpt, content,
      focusKeyword, site, coverMode, coverUrl, faqItems,
    };
    try { localStorage.setItem(NEW_ARTICLE_DRAFT_KEY, JSON.stringify(draft)); } catch { /* quota exceeded */ }
  }, [articleId, title, slug, slugManuallyEdited, category, readTime, excerpt, content, focusKeyword, site, coverMode, coverUrl, faqItems]);

  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML || "";
    const md = htmlToMarkdown(html);
    setContent(md);
  };

  const syncEditorContent = (nextContent: string) => {
    setContent(nextContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = markdownToHtml(nextContent);
      wrapExistingImages(editorRef.current);
    }
  };

  const appendToArticle = (markdown: string) => {
    const nextContent = [content.trim(), markdown.trim()].filter(Boolean).join("\n\n");
    syncEditorContent(nextContent);
  };

  const editOperationKey = (edit: any) => [edit.field, edit.operation, edit.targetText, edit.replacementText].join("::");

  const pushHistorySnapshot = (description: string) => {
    const snapshot: EditorSnapshot = {
      title, slug, excerpt, content, focusKeyword,
      description,
      timestamp: Date.now(),
    };
    setEditorHistory((prev) => [...prev.slice(-19), snapshot]); // keep last 20
  };

  const applyAIEdit = (edit: any) => {
    const targetText = typeof edit.targetText === "string" ? edit.targetText : "";
    const replacementText = typeof edit.replacementText === "string" ? edit.replacementText : "";
    const sourceByField: Record<GuidanceTarget, string> = { title, excerpt, content, keyword: focusKeyword };
    const source = sourceByField[edit.field as GuidanceTarget];

    if (!source || !targetText || !source.includes(targetText)) {
      setAiReviewError("Teks target sudah berubah. AI sedang memperbarui saran agar sesuai dengan versi artikel terbaru.");
      return;
    }

    const fieldLabel = edit.field === "title" ? "judul" : edit.field === "excerpt" ? "kutipan" : edit.field === "keyword" ? "kata kunci" : "isi artikel";
    const opLabel = edit.operation === "insert_after" ? "Tambah teks" : edit.operation === "delete" ? "Hapus teks" : "Ganti teks";
    pushHistorySnapshot(`${opLabel} pada ${fieldLabel}: "${targetText.slice(0, 50)}${targetText.length > 50 ? "..." : ""}"`);

    let nextValue = source;
    if (edit.operation === "insert_after") nextValue = source.replace(targetText, `${targetText}\n\n${replacementText}`);
    else nextValue = source.replace(targetText, edit.operation === "delete" ? "" : replacementText);

    if (edit.field === "title") setTitle(nextValue.trim());
    else if (edit.field === "excerpt") setExcerpt(nextValue.trim());
    else if (edit.field === "keyword") setFocusKeyword(nextValue.trim());
    else syncEditorContent(nextValue.trim());

    setDismissedEditKeys((current) => [...new Set([...current, editOperationKey(edit)])]);
    // Mark this field's currently-shown companion guidance as resolved so it
    // won't reappear — must key off the same targetId/message the filter
    // uses (targetId differs from the raw field name for content/keyword).
    setResolvedGuidanceKeys((current) => {
      const next = new Set(current);
      const targetId = FIELD_TARGET_MAP[edit.field as GuidanceTarget]?.targetId || edit.field;
      const activeItem = companionGuidance.find((item) => item.targetId === targetId);
      next.add(guidanceResolvedKey(targetId, activeItem?.message || ""));
      return next;
    });
    verificationPendingRef.current = true;
    setVerificationNotice("checking");
    setAiReviewError(null);
  };

  const undoLastAIEdit = () => {
    if (editorHistory.length === 0) return;
    const lastSnapshot = editorHistory[editorHistory.length - 1];
    setTitle(lastSnapshot.title);
    setSlug(lastSnapshot.slug);
    setExcerpt(lastSnapshot.excerpt);
    setFocusKeyword(lastSnapshot.focusKeyword);
    syncEditorContent(lastSnapshot.content);
    setEditorHistory((prev) => prev.slice(0, -1));
    verificationPendingRef.current = true;
    setVerificationNotice("checking");
  };

  const undoToSnapshot = (index: number) => {
    if (index < 0 || index >= editorHistory.length) return;
    const snapshot = editorHistory[index];
    setTitle(snapshot.title);
    setSlug(snapshot.slug);
    setExcerpt(snapshot.excerpt);
    setFocusKeyword(snapshot.focusKeyword);
    syncEditorContent(snapshot.content);
    setEditorHistory((prev) => prev.slice(0, index));
    verificationPendingRef.current = true;
    setVerificationNotice("checking");
    setShowHistoryPanel(false);
  };

  const applyContentGap = (gap: any) => {
    const suggestedContent = typeof gap?.suggestedContent === "string" ? gap.suggestedContent.trim() : "";
    if (!suggestedContent) return;
    pushHistorySnapshot(`Tambah content gap: "${gap.topic?.slice(0, 50) || "topik baru"}"`);
    appendToArticle(suggestedContent);
    verificationPendingRef.current = true;
    setVerificationNotice("checking");
  };

  const addSuggestedFaqs = (suggestions: Array<{ question: string; answer: string }>) => {
    setFaqItems((current) => {
      const existingQuestions = new Set(current.map((item) => item.q.trim().toLowerCase()));
      const additions = suggestions
        .filter((item) => item.question?.trim() && item.answer?.trim() && !existingQuestions.has(item.question.trim().toLowerCase()))
        .map((item) => ({ q: item.question.trim(), a: item.answer.trim() }));
      return [...current, ...additions];
    });
  };

  const applyGuidanceExample = (guidance: any) => {
    const example = typeof guidance?.example === "string" ? guidance.example.trim() : "";
    if (!example) return;

    const target = inferGuidanceTarget(guidance.field, guidance.message || guidance.action || "");
    const fieldLabel = target === "title" ? "judul" : target === "excerpt" ? "kutipan" : target === "keyword" ? "kata kunci" : "isi artikel";
    pushHistorySnapshot(`Terapkan contoh pada ${fieldLabel}`);

    if (target === "title") setTitle(example);
    else if (target === "excerpt") setExcerpt(example);
    else if (target === "keyword") setFocusKeyword(example);
    else appendToArticle(example);

    // Mark this guidance as resolved — won't reappear. Key must match the
    // companionGuidance filter's targetId (not the raw field name).
    setResolvedGuidanceKeys((current) => {
      const next = new Set(current);
      const targetId = FIELD_TARGET_MAP[target]?.targetId || target;
      next.add(guidanceResolvedKey(targetId, guidance.message || ""));
      return next;
    });
  };

  const handleFormat = (command: string, value: string = "") => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      handleEditorInput();
    }
  };

  const handleOpenLinkModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      savedSelectionRef.current = { range: range.cloneRange(), rect };

      // Check if selection is inside editor
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        setLinkUrl("");
        setShowLinkModal(true);
      }
    }
  };

  const handleApplyLink = () => {
    if (!linkUrl.trim()) return;

    const url = linkUrl.trim();
    const saved = savedSelectionRef.current;
    if (!saved) return;

    // Restore selection
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(saved.range);
    }

    if (sel && sel.toString().length === 0) {
      // If nothing is selected, insert the URL as text inside an <a> tag
      const a = document.createElement("a");
      a.href = url;
      a.textContent = url;
      saved.range.insertNode(a);
      // Move cursor after the inserted node
      saved.range.setStartAfter(a);
      saved.range.setEndAfter(a);
      sel.removeAllRanges();
      sel.addRange(saved.range);
    } else {
      // Wrap selection safely using execCommand
      document.execCommand("createLink", false, url);
    }

    setShowLinkModal(false);
    setLinkUrl("");
    savedSelectionRef.current = null;
    handleEditorInput();
  };

  const handleRemoveLink = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        let node: HTMLElement | null = range.commonAncestorContainer as HTMLElement;
        while (node && node !== editor) {
          if (node.nodeName === "A") {
            const parent = node.parentNode;
            while (node.firstChild) {
              parent?.insertBefore(node.firstChild, node);
            }
            parent?.removeChild(node);
            handleEditorInput();
            return;
          }
          node = node.parentElement;
        }
      }
    }
  };

  const handleOpenImageModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        savedSelectionRef.current = { range: range.cloneRange(), rect: range.getBoundingClientRect() };
      }
    }
    editingImageRef.current = null;
    setIsEditingImage(false);
    setImageUrl("");
    setImageAlt("");
    setShowImageModal(true);
  };

  const handleOpenEditImage = (img: HTMLImageElement) => {
    editingImageRef.current = img;
    setIsEditingImage(true);
    setImageUrl(img.src);
    setImageAlt(img.alt === "Gambar artikel" ? "" : img.alt);
    setShowImageModal(true);
  };

  const handleDeleteImage = (img: HTMLImageElement) => {
    const wrapper = img.closest(".img-wrapper");
    if (wrapper) {
      wrapper.replaceWith(document.createTextNode(""));
    } else {
      img.remove();
    }
    handleEditorInput();
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    const editor = editorRef.current;
    if (!editor) return;

    const editing = editingImageRef.current;
    if (editing) {
      editing.src = imageUrl.trim();
      editing.alt = imageAlt.trim() || "Gambar artikel";
    } else {
      editor.focus();
      const saved = savedSelectionRef.current;
      if (saved) {
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(saved.range);
        }
      }
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (editor.contains(range.commonAncestorContainer)) {
          const wrapper = document.createElement("div");
          wrapper.className = "img-wrapper";
          wrapper.style.position = "relative";
          wrapper.style.margin = "16px 0";

          const img = document.createElement("img");
          img.src = imageUrl.trim();
          img.alt = imageAlt.trim() || "Gambar artikel";
          img.style.maxWidth = "100%";
          img.style.borderRadius = "12px";
          img.style.display = "block";

          const overlay = document.createElement("div");
          overlay.className = "img-overlay";
          overlay.innerHTML = `<button type="button" data-img-action="edit" class="img-btn img-btn-edit">Ganti</button><button type="button" data-img-action="delete" class="img-btn img-btn-delete">Hapus</button>`;

          wrapper.appendChild(img);
          wrapper.appendChild(overlay);
          range.deleteContents();
          range.insertNode(wrapper);

          const p = document.createElement("p");
          p.innerHTML = "<br>";
          wrapper.after(p);
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
      }
    }
    handleEditorInput();
    savedSelectionRef.current = null;
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    editingImageRef.current = null;
    setIsEditingImage(false);
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const action = target.getAttribute("data-img-action");
    if (!action) return;
    const wrapper = target.closest(".img-wrapper");
    if (!wrapper) return;
    const img = wrapper.querySelector("img");
    if (!img) return;
    if (action === "edit") {
      handleOpenEditImage(img as HTMLImageElement);
    } else if (action === "delete") {
      handleDeleteImage(img as HTMLImageElement);
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Format file tidak didukung! Gunakan gambar.");
      return;
    }
    setError(null);
    setIsCompressing(true);
    try {
      const compressed = file;
      setIsCompressing(false);
      setIsUploadingImage(true);
      // Was hand-rolling a fetch to `${VITE_API_URL}/api/upload` — that env
      // var is never set at build time and the path doesn't match any real
      // admin-api route (it's /api/v1/media/upload). Reuse the already
      // correct, authenticated helper instead.
      const result = await api.uploadMedia(compressed);
      if (result?.data?.url) {
        setImageUrl(result.data.url);
      } else {
        setError("Gagal upload gambar.");
      }
    } catch (err: any) {
      setError(err?.message || "Gagal upload gambar.");
    } finally {
      setIsCompressing(false);
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Format file tidak didukung! Gunakan gambar.");
      return;
    }
    setError(null);
    setIsCompressing(true);
    try {
      const compressed = file;
      setCoverFile(compressed);
      setCoverPreview(URL.createObjectURL(compressed));
    } catch {
      setError("Gagal mengompres gambar.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = () => {
    setCoverFile(null);
    setCoverPreview(IMAGE_PRESETS[0].url);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const switchToUrl = () => {
    setCoverMode("url");
    setCoverUrl(coverPreview);
  };

  const switchToUpload = () => {
    setCoverMode("upload");
    setCoverFile(null);
    setCoverPreview(coverUrl);
  };

  const getPreviewImage = () => {
    if (coverMode === "upload" && coverFile) return coverPreview;
    return coverUrl || IMAGE_PRESETS[0].url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate content manually since the textarea is hidden
    if (!content.trim()) {
      setError("Isi lengkap artikel tidak boleh kosong!");
      return;
    }

    startTransition(async () => {
      try {
        const duplicateResult = await api.dedupCheck({
          title,
          excerpt,
          content,
          site,
          existingSlug: originalSlug || undefined,
          focusKeyword: focusKeyword.trim() || undefined,
        });
        if (duplicateResult.risk === "high") {
          const closestMatch = duplicateResult.results?.[0];
          throw new Error(closestMatch
            ? `Artikel tidak dapat diterbitkan karena terlalu mirip dengan “${closestMatch.matchedTitle}” (${Math.round(closestMatch.similarity * 100)}%). Ubah judul atau sudut pembahasannya.`
            : "Artikel tidak dapat diterbitkan karena terlalu mirip dengan artikel yang sudah ada.");
        }

        let finalCoverUrl = coverUrl;
        
        // Upload image if in upload mode and a file is selected
        if (coverMode === "upload" && coverFile) {
          const uploadRes = await api.uploadMedia(coverFile);
          if (uploadRes && uploadRes.data && uploadRes.data.url) {
            finalCoverUrl = uploadRes.data.url;
          } else {
            throw new Error("Gagal mengunggah cover image.");
          }
        }

        const articleData = {
          title,
          slug: slug.trim() || slugifyArticleTitle(title),
          category,
          readTime,
          excerpt,
          content,
          coverImage: finalCoverUrl,
          seoTitle: title,
          seoDesc: excerpt,
          focusKeyword: focusKeyword.trim() || null,
          site,
          status: "published", // You can modify this if you add a status dropdown
          faq: faqItems.filter(f => f.q.trim() && f.a.trim()),
        };

        if (articleId) {
          await api.updateArticle(articleId, articleData);
        } else {
          await api.createArticle(articleData);
        }

        // Trigger ISR revalidation on public site — proxied through admin-api
        // so this browser-executed code never has to hold REVALIDATION_SECRET.
        await api.revalidateArticle(articleData.slug);

        // Article is saved now — the autosaved draft would otherwise
        // resurrect as a stale draft the next time "Tulis Artikel Baru" opens.
        try { localStorage.removeItem(NEW_ARTICLE_DRAFT_KEY); } catch { /* ignore */ }

        window.location.hash = "#/articles";
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat menyimpan artikel.");
      }
    });
  };

  return (
    <div className="flex flex-col flex-1 -m-[32px] bg-gray-50">

      {/* HEADER */}
            <div className="px-6 py-6 sm:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tulis Artikel Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Buat artikel baru untuk dipublikasikan</p>
        </div>
        <a href="#/articles" className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Kembali</a>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-14 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* FORM */}
            <div className="lg:col-span-7 bg-white shadow-sm rounded-xl border border-gray-200 p-6 sm:p-8">

              {error && (
                <div className="mb-6 p-4.5 bg-red-50 border border-red-200 rounded-2xl text-[16px] text-[#990202] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#990202] flex-shrink-0 animate-ping" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Judul Artikel <span className="text-[#990202]">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Panduan Lengkap Cara Mengurus NIB di OSS RBA 2026"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="articleSlug" className="text-[16px] font-extrabold text-gray-900">Slug Artikel</label>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-4 focus-within:border-[#990202] focus-within:ring-4 focus-within:ring-red-100 transition-all">
                    <span className="text-[14px] font-semibold text-gray-400">/artikel/</span>
                    <input
                      id="articleSlug"
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setSlug(slugifyArticleTitle(e.target.value));
                        setSlugManuallyEdited(true);
                      }}
                      placeholder="panduan-mengurus-nib"
                      className="min-w-0 flex-1 bg-transparent py-3 text-[15px] font-medium text-gray-900 outline-none"
                    />
                  </div>
                  {originalSlug && slug && slug !== originalSlug && (
                    <p className="text-[12px] font-medium text-amber-700">Slug lama berubah. Pastikan redirect dari /artikel/{originalSlug} dibuat setelah artikel disimpan.</p>
                  )}
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-[16px] font-extrabold text-gray-900">
                      Kategori <span className="text-[#990202]">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-semibold text-gray-800"
                    >
                      <optgroup label="Pendirian Usaha">
                        <option value="Legalitas PT">Legalitas PT</option>
                        <option value="CV">CV</option>
                        <option value="PT Perorangan">PT Perorangan</option>
                        <option value="PT PMA">PT PMA</option>
                        <option value="Firma">Firma</option>
                        <option value="Perkumpulan">Perkumpulan</option>
                        <option value="Yayasan">Yayasan</option>
                        <option value="Koperasi">Koperasi</option>
                        <option value="UMKM">UMKM</option>
                      </optgroup>
                      <optgroup label="Lainnya">
                        <option value="Merek & HAKI">Merek & HAKI</option>
                        <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                        <option value="NIB">NIB</option>
                        <option value="Pajak Bisnis">Pajak Bisnis</option>
                        <option value="Virtual Office">Virtual Office</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="readTime" className="text-[16px] font-extrabold text-gray-900">
                      Estimasi Waktu Baca <span className="text-[#990202]">*</span>
                    </label>
                    <input
                      id="readTime"
                      name="readTime"
                      type="text"
                      required
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="Contoh: 5 menit baca"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                    />
                  </div>
                </div>

                {/* Domain / Site Selector */}
                <div className="space-y-2">
                  <label htmlFor="site" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Domain Publikasi <span className="text-[#990202]">*</span>
                  </label>
                  <select
                    id="site"
                    name="site"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-semibold text-gray-800"
                  >
                    <option value="easylegal.biz.id">easylegal.biz.id</option>
                    <option value="easylegal.co.id">easylegal.co.id</option>
                    <option value="easylegal.id">easylegal.id</option>
                  </select>
                  <p className="text-[13px] text-gray-400 font-medium">Artikel hanya akan tampil di domain yang dipilih.</p>
                </div>

                {/* Cover Image - Tab Mode */}
                <div className="space-y-3">
                  <label className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Gambar Sampul (Cover Image)
                  </label>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={switchToUpload}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[16px] font-bold transition-all ${
                        coverMode === "upload"
                          ? "bg-white text-[#990202] shadow-sm shadow-sm border border-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={switchToUrl}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[16px] font-bold transition-all ${
                        coverMode === "url"
                          ? "bg-white text-[#990202] shadow-sm shadow-sm border border-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Input URL</span>
                    </button>
                  </div>

                  {/* Upload Mode */}
                  {coverMode === "upload" && (
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />

                      {coverFile ? (
                        /* File selected preview */
                        <div className="relative shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                          <img
                            src={coverPreview}
                            alt="Preview"
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-white text-[16px] font-bold truncate max-w-[70%]">
                                {coverFile.name}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[16px] font-bold rounded-lg transition-colors"
                                >
                                  Ganti
                                </button>
                                <button
                                  type="button"
                                  onClick={removeFile}
                                  className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white text-[16px] font-bold rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <X className="w-3 h-3" />
                                  Hapus
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Drop zone */
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                            isDragging
                              ? "border-[#990202] bg-red-50"
                              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              isDragging ? "bg-red-100" : "bg-gray-100"
                            }`}>
                              <Upload className={`w-6 h-6 ${isDragging ? "text-[#990202]" : "text-gray-400"}`} />
                            </div>
                            <div>
                              <p className="text-[16px] font-bold text-gray-700">
                                {isDragging ? "Lepaskan gambar di sini" : "Klik atau seret gambar ke sini"}
                              </p>
                              <p className="text-[16px] text-gray-400 mt-1">
                                JPG, PNG, WebP, atau GIF (maks. 5MB)
                              </p>
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[16px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Atau gunakan gambar preset:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {IMAGE_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setCoverFile(null);
                                setCoverPreview(preset.url);
                                setCoverUrl(preset.url);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                              }}
                              className={`px-3 py-1.5 text-[16px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
                                coverPreview === preset.url && !coverFile
                                  ? "bg-red-50 text-[#990202] border-[#990202]/30 shadow-sm"
                                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              {coverPreview === preset.url && !coverFile && <Check className="w-3 h-3 text-[#990202]" />}
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* URL Mode */}
                  {coverMode === "url" && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        name="coverImageUrl"
                        value={coverUrl}
                        onChange={(e) => {
                          setCoverUrl(e.target.value);
                          setCoverPreview(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                      />

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[16px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Atau gunakan gambar preset:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {IMAGE_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setCoverUrl(preset.url);
                                setCoverPreview(preset.url);
                              }}
                              className={`px-3 py-1.5 text-[16px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
                                coverUrl === preset.url
                                  ? "bg-red-50 text-[#990202] border-[#990202]/30 shadow-sm"
                                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              {coverUrl === preset.url && <Check className="w-3 h-3 text-[#990202]" />}
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label htmlFor="excerpt" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Kutipan Singkat (Excerpt) <span className="text-[#990202]">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    rows={2}
                    maxLength={200}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Tuliskan rangkuman artikel singkat (maksimal 200 karakter)..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950 resize-none"
                  />
                  <div className="text-right text-[16px] font-bold text-gray-400">
                    {excerpt.length} / 200 karakter
                  </div>
                </div>

                {/* FAQ — tampil di akhir artikel di website publik */}
                <div className="space-y-2">
                  <label className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    FAQ Artikel (opsional)
                  </label>
                  <p className="text-[14px] text-gray-500">
                    Muncul sebagai accordion di akhir artikel. Kosongkan semua kalau artikel ini tidak perlu FAQ.
                  </p>
                  <div className="space-y-3">
                    {faqItems.map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-[14px] font-bold text-gray-700">Pertanyaan {idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))}
                            className="text-[13px] font-bold text-[#990202] hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.q}
                          onChange={(e) => setFaqItems(faqItems.map((f, i) => i === idx ? { ...f, q: e.target.value } : f))}
                          placeholder="Pertanyaan..."
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#990202]"
                        />
                        <textarea
                          value={item.a}
                          onChange={(e) => setFaqItems(faqItems.map((f, i) => i === idx ? { ...f, a: e.target.value } : f))}
                          placeholder="Jawaban..."
                          rows={2}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#990202] resize-none"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setFaqItems([...faqItems, { q: "", a: "" }])}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    + Tambah Pertanyaan
                  </button>
                </div>

                {/* Focus Keyword (SEO) */}
                <div className="space-y-2">
                  <label htmlFor="focusKeyword" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Kata Kunci Utama (Focus Keyword) SEO
                  </label>
                  <input
                    id="focusKeyword"
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="Contoh: cara mengurus NIB"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                  />
                  <p className="text-[14px] text-gray-500 font-medium mt-1">
                    Kata kunci utama yang ingin dioptimalkan. Disimpan ke database dan digunakan untuk memeriksa potensi keyword cannibalization dengan artikel lain.
                  </p>
                </div>

                {/* AI Companion */}
                <div className="space-y-3 p-4 bg-gradient-to-br from-red-50/60 to-white border border-red-100 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                        <Sparkles size={18} className="text-[#990202]" /> AI Companion
                      </span>
                      <p className="text-[13px] text-gray-500 mt-1">Aktif otomatis selama Anda menulis.</p>
                    </div>
                    <span className={`px-3 py-1.5 text-[13px] font-bold rounded-full flex items-center gap-2 ${aiReviewLoading ? "bg-amber-50 text-amber-700" : aiReview ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {aiReviewLoading ? (
                        <><Loader2 size={14} className="animate-spin" /> Membaca perubahan...</>
                      ) : aiReview ? (
                        <><span className="w-2 h-2 rounded-full bg-emerald-500" /> Memantau otomatis</>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-gray-400" /> Mulai menulis</>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-100 bg-white p-2.5">
                    <span className="text-[11px] font-extrabold text-gray-500">Fokus analisis:</span>
                    <select
                      value={reviewMode}
                      onChange={(e) => setReviewMode(e.target.value as ReviewMode)}
                      className="min-w-[170px] flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[12px] font-bold text-gray-800 outline-none focus:border-[#990202]"
                    >
                      <option value="complete">Pemeriksaan lengkap</option>
                      <option value="seo">SEO & search intent</option>
                      <option value="legal">Akurasi legal</option>
                      <option value="readability">Keterbacaan</option>
                      <option value="conversion">Konversi & CTA</option>
                    </select>
                  </div>

                  {verificationNotice && (
                    <div className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-[12px] font-semibold ${verificationNotice === "checking" ? "border-blue-100 bg-blue-50 text-blue-800" : "border-emerald-100 bg-emerald-50 text-emerald-800"}`}>
                      <span className="flex items-center gap-2">
                        {verificationNotice === "checking" ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                        {verificationNotice === "checking" ? "Perubahan diterapkan. AI sedang memeriksa ulang hasilnya…" : "Pemeriksaan ulang selesai. Saran sudah diperbarui untuk versi terbaru."}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {editorHistory.length > 0 && (
                          <button type="button" onClick={() => setShowHistoryPanel(!showHistoryPanel)} className="font-extrabold underline">
                            Riwayat ({editorHistory.length})
                          </button>
                        )}
                        {editorHistory.length > 0 && (
                          <button type="button" onClick={undoLastAIEdit} className="font-extrabold underline">Batalkan</button>
                        )}
                      </div>
                    </div>
                  )}

                  {showHistoryPanel && editorHistory.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-white p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-black uppercase tracking-wider text-gray-700">Riwayat Perubahan AI</span>
                        <button type="button" onClick={() => setShowHistoryPanel(false)} className="text-[11px] font-bold text-gray-500 hover:text-gray-800">Tutup</button>
                      </div>
                      <p className="text-[11px] text-gray-500">Klik "Kembalikan" untuk mengembalikan ke状态 sebelum perubahan tersebut.</p>
                      <div className="max-h-[200px] overflow-y-auto space-y-1.5">
                        {[...editorHistory].reverse().map((snapshot, reverseIdx) => {
                          const realIdx = editorHistory.length - 1 - reverseIdx;
                          return (
                            <div key={snapshot.timestamp} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[11px]">
                              <div className="min-w-0 flex-1">
                                <span className="font-bold text-gray-800">{snapshot.description}</span>
                                <span className="ml-2 text-gray-400">{new Date(snapshot.timestamp).toLocaleTimeString("id-ID")}</span>
                              </div>
                              <button type="button" onClick={() => undoToSnapshot(realIdx)} className="flex-shrink-0 px-2 py-1 rounded bg-amber-50 text-amber-700 font-extrabold hover:bg-amber-100">
                                Kembalikan
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {aiReviewError && (
                    <p className="text-[14px] text-red-600 flex items-center gap-1.5"><XCircle size={16} /> {aiReviewError}</p>
                  )}

                  {aiReview && (
                    <div className="space-y-3">
                      {aiReview.duplicateCheck && !resolvedGuidanceKeys.has("duplicate-check::") && (
                        <div className={`rounded-xl border p-3.5 ${aiReview.duplicateCheck.risk === "high" ? "bg-red-50 border-red-200" : aiReview.duplicateCheck.risk === "medium" ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {aiReview.duplicateCheck.risk === "low" ? <CheckCircle size={16} className="text-emerald-600" /> : <AlertTriangle size={16} className={aiReview.duplicateCheck.risk === "high" ? "text-red-600" : "text-amber-600"} />}
                              <span className="text-[12px] font-black uppercase tracking-wider text-gray-800">Komparasi database artikel</span>
                            </div>
                            {aiReview.duplicateCheck.risk !== "low" && (
                              <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "duplicate-check::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                                Selesai
                              </button>
                            )}
                          </div>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
                            {aiReview.duplicateCheck.risk === "low"
                              ? "Tidak ditemukan artikel lama yang mirip secara material."
                              : aiReview.duplicateCheck.risk === "high"
                                ? "Artikel terlalu mirip dan harus dibedakan sebelum diterbitkan."
                                : "Ada artikel dengan topik serupa. Gunakan sudut pembahasan yang berbeda."}
                          </p>
                          {aiReview.duplicateCheck.results?.length > 0 && (
                            <ul className="mt-2 space-y-1.5 text-[12px] text-gray-700">
                              {aiReview.duplicateCheck.results.slice(0, 3).map((match: any) => (
                                <li key={match.matchedSlug} className="flex items-start justify-between gap-3">
                                  <span className="line-clamp-1">{match.matchedTitle}</span>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {match.keywordCannibalization && (
                                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-extrabold uppercase">
                                        Keyword sama: {match.matchedFocusKeyword}
                                      </span>
                                    )}
                                    <strong className="text-[#990202]">{Math.round(match.similarity * 100)}% mirip</strong>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                          {aiReview.duplicateCheck.results?.some((m: any) => m.keywordCannibalization) && (
                            <div className="mt-2.5 rounded-lg bg-orange-50 border border-orange-200 p-2.5 text-[12px] text-orange-800">
                              <strong>Keyword Cannibalization terdeteksi:</strong> Beberapa artikel menargetkan kata kunci yang sama. Ini dapat memecah otoritas SEO. Pertimbangkan untuk menggabungkan artikel atau membedakan target keyword masing-masing.
                            </div>
                          )}
                        </div>
                      )}

                      {/* Copywriting Similarity Check */}
                      {aiReview.copywritingCheck && aiReview.copywritingCheck.risk !== "low" && !resolvedGuidanceKeys.has("copywriting-check::") && (
                        <div className={`rounded-xl border p-3.5 ${aiReview.copywritingCheck.risk === "high" ? "bg-orange-50 border-orange-200" : "bg-amber-50 border-amber-200"}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {aiReview.copywritingCheck.risk === "high" ? <AlertTriangle size={16} className="text-orange-600" /> : <AlertTriangle size={16} className="text-amber-600" />}
                              <strong className={`text-[12px] font-extrabold uppercase tracking-wider ${aiReview.copywritingCheck.risk === "high" ? "text-orange-900" : "text-amber-900"}`}>
                                Copywriting Terlalu Umum
                              </strong>
                            </div>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "copywriting-check::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="mt-1.5 text-[13px] text-gray-700">{aiReview.copywritingCheck.message}</p>
                          {aiReview.copywritingCheck.matches?.length > 0 && (
                            <ul className="mt-2 space-y-1.5 text-[12px] text-gray-700">
                              {aiReview.copywritingCheck.matches.slice(0, 3).map((match: any, i: number) => (
                                <li key={i} className="rounded-lg bg-white border border-orange-100 p-2.5">
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="line-clamp-1 font-medium">"{match.matchedText}"</span>
                                    <strong className="text-orange-600 flex-shrink-0">{Math.round(match.similarity * 100)}%</strong>
                                  </div>
                                  <p className="mt-1 text-[11px] text-gray-500">Sumber: {match.originalSource}</p>
                                  {match.suggestion && <p className="mt-1 text-[11px] font-semibold text-orange-700">Saran: {match.suggestion}</p>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* Tone Consistency Check */}
                      {aiReview.toneCheck && aiReview.toneCheck.overall !== "consistent" && !resolvedGuidanceKeys.has("tone-check::") && (
                        <div className={`rounded-xl border p-3.5 ${aiReview.toneCheck.overall === "inconsistent" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle size={16} className={aiReview.toneCheck.overall === "inconsistent" ? "text-red-600" : "text-amber-600"} />
                              <strong className={`text-[12px] font-extrabold uppercase tracking-wider ${aiReview.toneCheck.overall === "inconsistent" ? "text-red-900" : "text-amber-900"}`}>
                                Tone Tidak Konsisten
                              </strong>
                            </div>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "tone-check::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="mt-1.5 text-[13px] text-gray-700">{aiReview.toneCheck.message}</p>
                          {aiReview.toneCheck.issues?.length > 0 && (
                            <ul className="mt-2 space-y-1.5 text-[12px]">
                              {aiReview.toneCheck.issues.slice(0, 3).map((issue: any, i: number) => (
                                <li key={i} className="rounded-lg bg-white border border-amber-100 p-2.5">
                                  <strong className="text-gray-900">{issue.location}</strong>
                                  <p className="mt-1 text-gray-600">{issue.problem}</p>
                                  {issue.suggestion && <p className="mt-1 font-semibold text-amber-700">Saran: {issue.suggestion}</p>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {visibleEditOperations.length > 0 && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-3">
                          <div>
                            <span className="text-[12px] font-black uppercase tracking-wider text-emerald-900">Preview perubahan aman</span>
                            <p className="mt-1 text-[11px] text-gray-500">AI hanya dapat menerapkan perubahan jika teks target masih sama persis dengan draft Anda.</p>
                          </div>
                          <div className="space-y-3">
                            {visibleEditOperations.map((edit: any) => (
                              <div key={editOperationKey(edit)} className="rounded-xl border border-emerald-100 bg-white p-3 text-[12px]">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <strong className="text-gray-900">{edit.field === "title" ? "Judul" : edit.field === "excerpt" ? "Kutipan" : edit.field === "keyword" ? "Kata kunci" : "Isi artikel"}</strong>
                                  <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-extrabold uppercase text-gray-600">
                                    {edit.operation === "insert_after" ? "Tambah setelah teks" : edit.operation === "delete" ? "Hapus teks" : "Ganti teks"}
                                  </span>
                                </div>
                                <p className="mt-2 leading-relaxed text-gray-600">{edit.reason}</p>
                                <div className="mt-2 grid gap-2">
                                  <div className="rounded-lg border border-red-100 bg-red-50/60 p-2.5">
                                    <strong className="block text-[10px] uppercase tracking-wide text-red-700">{edit.operation === "insert_after" ? "Posisi setelah" : "Sebelum"}</strong>
                                    <p className="mt-1 whitespace-pre-wrap text-gray-700">{edit.targetText}</p>
                                  </div>
                                  {edit.operation !== "delete" && (
                                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-2.5">
                                      <strong className="block text-[10px] uppercase tracking-wide text-emerald-700">{edit.operation === "insert_after" ? "Teks yang ditambahkan" : "Sesudah"}</strong>
                                      <p className="mt-1 whitespace-pre-wrap font-semibold text-gray-800">{edit.replacementText}</p>
                                    </div>
                                  )}
                                </div>
                                <div className="mt-3 flex gap-3">
                                  <button type="button" onClick={() => applyAIEdit(edit)} className="rounded-lg bg-emerald-700 px-3 py-2 font-extrabold text-white hover:bg-emerald-800">Terapkan perubahan</button>
                                  <button type="button" onClick={() => setDismissedEditKeys((current) => [...new Set([...current, editOperationKey(edit)])])} className="px-2 py-2 font-extrabold text-gray-500 hover:text-gray-800">Abaikan</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {aiReview.guidance?.length > 0 && (
                        <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-3.5 space-y-3">
                          <div>
                            <span className="text-[12px] font-black uppercase tracking-wider text-violet-900">Rincian perbaikan prioritas</span>
                            <p className="mt-1 text-[11px] text-gray-500">Setiap saran menunjukkan bagian, perubahan, cara menerapkan, dan contoh hasilnya.</p>
                          </div>
                          <div className="space-y-3">
                            {aiReview.guidance
                              .filter((item: any) => !resolvedGuidanceKeys.has(`guidance::${item.field}::${item.message}`))
                              .map((item: any, index: number) => (
                              <div key={`${item.field}-${index}`} className="rounded-xl border border-violet-100 bg-white p-3 text-[12px] leading-relaxed text-gray-700">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <strong className="text-[13px] text-gray-900">{index + 1}. {item.message}</strong>
                                  <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-extrabold text-violet-700">{item.location || item.field}</span>
                                    <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, `guidance::${item.field}::${item.message}`]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                                      Selesai
                                    </button>
                                  </div>
                                </div>
                                {item.problem && <p className="mt-2"><strong>Kondisi sekarang:</strong> {item.problem}</p>}
                                {item.action && <p className="mt-1"><strong>Yang harus diubah:</strong> {item.action}</p>}
                                {item.example && (
                                  <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-950">
                                    <strong className="block text-[10px] uppercase tracking-wide text-emerald-700">Contoh hasil</strong>
                                    <p className="mt-1 font-semibold">{item.example}</p>
                                  </div>
                                )}
                                {item.reason && <p className="mt-2 text-gray-500"><strong>Tujuan:</strong> {item.reason}</p>}
                                {item.example && visibleEditOperations.length === 0 && (
                                  <button type="button" onClick={() => applyGuidanceExample(item)} className="mt-2 font-extrabold text-violet-700 hover:underline">
                                    {inferGuidanceTarget(item.field, item.message || "") === "content" ? "Tambahkan contoh ke artikel" : "Gunakan contoh ini"}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {aiReview.seoSupport && !resolvedGuidanceKeys.has("seo-support::") && (
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2 text-[12px] font-black uppercase tracking-wider text-blue-900">
                              <Activity size={16} className="text-blue-600" /> SEO & dukungan indexing
                            </span>
                            <div className="flex items-center gap-2">
                              {aiReview.seoSupport.recommendedSlug && (
                                <code className="max-w-[45%] truncate rounded-md bg-white px-2 py-1 text-[10px] font-bold text-blue-700 border border-blue-100">/{aiReview.seoSupport.recommendedSlug}</code>
                              )}
                              <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "seo-support::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                                Selesai
                              </button>
                            </div>
                          </div>
                          {aiReview.seoSupport.recommendedSlug && aiReview.seoSupport.recommendedSlug !== slug && (
                            <button
                              type="button"
                              onClick={() => {
                                setSlug(aiReview.seoSupport.recommendedSlug);
                                setSlugManuallyEdited(true);
                              }}
                              className="text-[11px] font-extrabold text-blue-700 hover:underline"
                            >
                              Gunakan slug rekomendasi
                            </button>
                          )}

                          {aiReview.seoSupport.searchIntent && (
                            <p className="text-[13px] leading-relaxed text-gray-700">
                              <strong className="text-gray-900">Search intent:</strong> {aiReview.seoSupport.searchIntent}
                            </p>
                          )}

                          {aiReview.seoSupport.indexingSuggestions?.length > 0 && (
                            <div className="space-y-2">
                              {aiReview.seoSupport.indexingSuggestions.map((suggestion: any, index: number) => (
                                <div key={index} className="rounded-lg border border-blue-100 bg-white p-3 text-[12px] leading-relaxed text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle size={14} className="flex-shrink-0 text-blue-600" />
                                    <strong className="text-blue-900">{suggestion.area || "SEO on-page"}</strong>
                                  </div>
                                  {suggestion.currentIssue && <p className="mt-2"><strong>Kondisi sekarang:</strong> {suggestion.currentIssue}</p>}
                                  <p className="mt-1"><strong>Yang diubah:</strong> {suggestion.action || suggestion}</p>
                                  {suggestion.implementation && <p className="mt-1"><strong>Cara mengubah:</strong> {suggestion.implementation}</p>}
                                  {suggestion.expectedResult && <p className="mt-1 text-gray-500"><strong>Tujuan:</strong> {suggestion.expectedResult}</p>}
                                </div>
                              ))}
                            </div>
                          )}

                          {aiReview.seoSupport.internalLinks?.length > 0 && (
                            <div className="border-t border-blue-100 pt-2.5">
                              <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">Internal link yang relevan</span>
                              <div className="mt-2 space-y-2">
                                {aiReview.seoSupport.internalLinks.map((link: any) => (
                                  <div key={link.targetSlug} className="flex items-start justify-between gap-3 text-[12px]">
                                    <span className="min-w-0 text-gray-700"><strong>{link.anchorText}</strong> → <span className="line-clamp-1">{link.targetTitle}</span></span>
                                    <button type="button" onClick={() => appendToArticle(`[${link.anchorText}](/artikel/${link.targetSlug})`)} className="flex-shrink-0 font-extrabold text-blue-700 hover:underline">Tambahkan</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {aiReview.seoSupport.faqSuggestions?.length > 0 && (
                            <div className="border-t border-blue-100 pt-2.5">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">FAQ sesuai pencarian pengguna</span>
                                <button type="button" onClick={() => addSuggestedFaqs(aiReview.seoSupport.faqSuggestions)} className="text-[11px] font-extrabold text-blue-700 hover:underline">Tambahkan FAQ</button>
                              </div>
                              <ul className="mt-2 space-y-1 text-[12px] text-gray-700 list-disc pl-4">
                                {aiReview.seoSupport.faqSuggestions.map((faq: any, index: number) => <li key={index}>{faq.question}</li>)}
                              </ul>
                            </div>
                          )}

                          <p className="text-[10px] leading-relaxed text-gray-500">Saran ini membantu keterbacaan dan pemahaman mesin pencari, tetapi tidak menjamin halaman pasti terindeks atau mendapat peringkat tertentu.</p>
                        </div>
                      )}

                      {aiReview.contentGaps?.length > 0 && !resolvedGuidanceKeys.has("content-gaps::") && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[12px] font-black uppercase tracking-wider text-amber-900">Pembahasan yang masih kurang</span>
                              <p className="mt-1 text-[11px] text-gray-500">Bagian berikut belum dijawab dengan cukup jelas dalam draft.</p>
                            </div>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "content-gaps::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          {aiReview.contentGaps.map((gap: any, index: number) => (
                            <div key={`${gap.topic}-${index}`} className="rounded-xl border border-amber-100 bg-white p-3 text-[12px] leading-relaxed text-gray-700">
                              <strong className="text-[13px] text-gray-900">{gap.topic}</strong>
                              <p className="mt-1"><strong>Letakkan:</strong> {gap.location}</p>
                              {gap.whyNeeded && <p className="mt-1 text-gray-500"><strong>Mengapa perlu:</strong> {gap.whyNeeded}</p>}
                              <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2">
                                <strong className="block text-[10px] uppercase tracking-wide text-amber-700">Contoh isi</strong>
                                <p className="mt-1 whitespace-pre-wrap font-medium">{gap.suggestedContent}</p>
                              </div>
                              <button type="button" onClick={() => applyContentGap(gap)} className="mt-2 font-extrabold text-amber-800 hover:underline">Tambahkan sebagai draft di akhir</button>
                            </div>
                          ))}
                        </div>
                      )}

                      {aiReview.verificationNeeded?.length > 0 && !resolvedGuidanceKeys.has("verification-needed::") && (
                        <div className="rounded-xl border border-red-200 bg-red-50/60 p-3.5 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle size={16} className="text-red-600" />
                              <span className="text-[12px] font-black uppercase tracking-wider text-red-900">Klaim yang wajib diverifikasi</span>
                            </div>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "verification-needed::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="text-[11px] text-gray-600">AI tidak menganggap klaim hukum, biaya, atau tenggat sebagai fakta tanpa sumber resmi terbaru.</p>
                      {aiReview.verificationNeeded.map((item: any, index: number) => (
                            <div key={`${item.claim}-${index}`} className="rounded-lg border border-red-100 bg-white p-3 text-[12px] leading-relaxed text-gray-700">
                              <p><strong>Klaim:</strong> "{item.claim}"</p>
                              <p className="mt-1"><strong>Lokasi:</strong> {item.location}</p>
                              <p className="mt-1 text-red-700"><strong>Periksa menggunakan:</strong> {item.requiredSource}</p>
                              {item.regulationName && (
                                <p className="mt-1"><strong>Regulasi:</strong> {item.regulationName}</p>
                              )}
                              {item.lastUpdated && (
                                <p className="mt-1"><strong>Tanggal pembaruan:</strong> {item.lastUpdated}</p>
                              )}
                              {item.sourceLink && (
                                <p className="mt-1">
                                  <strong>Sumber:</strong>{" "}
                                  <a href={item.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {item.sourceLink}
                                  </a>
                                </p>
                              )}
                              {item.warning && (
                                <div className="mt-2 rounded bg-amber-50 border border-amber-200 px-2.5 py-1.5 text-[11px] text-amber-800">
                                  <strong>Peringatan:</strong> {item.warning}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {aiReview.recommendedTitle && !resolvedGuidanceKeys.has("recommended-title::") && (
                        <div className="bg-white border border-red-100 rounded-xl p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#990202]">Contoh judul</span>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "recommended-title::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="mt-1.5 text-[14px] font-bold leading-relaxed text-gray-800">{aiReview.recommendedTitle}</p>
                          <button type="button" onClick={() => setTitle(aiReview.recommendedTitle)} className="mt-2 text-[12px] font-extrabold text-[#990202] hover:underline">Gunakan judul ini</button>
                        </div>
                      )}

                      {aiReview.recommendedMetaDescription && !resolvedGuidanceKeys.has("recommended-meta::") && (
                        <div className="bg-white border border-red-100 rounded-xl p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#990202]">Contoh kutipan</span>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "recommended-meta::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-gray-700">{aiReview.recommendedMetaDescription}</p>
                          <button type="button" onClick={() => setExcerpt(aiReview.recommendedMetaDescription)} className="mt-2 text-[12px] font-extrabold text-[#990202] hover:underline">Gunakan kutipan ini</button>
                        </div>
                      )}

                      {aiReview.recommendedOutline?.length > 0 && !resolvedGuidanceKeys.has("recommended-outline::") && (
                        <div className="bg-white border border-red-100 rounded-xl p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#990202]">Contoh struktur artikel</span>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "recommended-outline::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <ol className="mt-2 space-y-1.5 text-[13px] text-gray-700">
                            {aiReview.recommendedOutline.map((heading: string, index: number) => (
                              <li key={`${heading}-${index}`} className="flex gap-2"><span className="font-black text-[#990202]">{index + 1}.</span><span>{heading}</span></li>
                            ))}
                          </ol>
                          <button type="button" onClick={() => appendToArticle(aiReview.recommendedOutline.map((heading: string) => `### ${heading.replace(/^#+\s*/, "")}`).join("\n\n"))} className="mt-2 text-[12px] font-extrabold text-[#990202] hover:underline">Tambahkan kerangka ke artikel</button>
                        </div>
                      )}

                      {aiReview.exampleParagraph && !resolvedGuidanceKeys.has("example-paragraph::") && (
                        <div className="bg-white border border-red-100 rounded-xl p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#990202]">Contoh pengembangan isi</span>
                            <button type="button" onClick={() => setResolvedGuidanceKeys((prev) => new Set([...prev, "example-paragraph::"]))} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 hover:underline transition-colors">
                              Selesai
                            </button>
                          </div>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-gray-700">{aiReview.exampleParagraph}</p>
                          <button type="button" onClick={() => appendToArticle(aiReview.exampleParagraph)} className="mt-2 text-[12px] font-extrabold text-[#990202] hover:underline">Tambahkan contoh ke artikel</button>
                        </div>
                      )}

                      {aiReview.suggestions?.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">Saran tambahan</span>
                          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-gray-700">
                            {aiReview.suggestions.map((suggestion: string, index: number) => (
                              <li key={index} className="flex gap-2"><CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-emerald-600" /><span>{suggestion}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                      Isi Lengkap Artikel <span className="text-[#990202]">*</span>
                    </label>
                  </div>

                  {/* Format Helper Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-50 shadow-sm border border-gray-200 rounded-xl">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("formatBlock", "<h3>")}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Ubah menjadi Sub-judul (H3)"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">H3</span>
                      <span>Sub-judul</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("bold")}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Jadikan Teks Tebal"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">B</span>
                      <span>Tebal</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleOpenLinkModal}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Link"
                    >
                      <ExternalLink className="w-3 h-3 text-[#990202]" />
                      <span>Link</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleRemoveLink}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Hapus Link dari Teks"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">~</span>
                      <span>Hapus Link</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleOpenImageModal}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Gambar"
                    >
                      <ImageIcon className="w-3 h-3 text-[#990202]" />
                      <span>Gambar</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertUnorderedList")}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan List Poin"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">•</span>
                      <span>List Poin</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertOrderedList")}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan List Angka"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">1.</span>
                      <span>List Angka</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertHorizontalRule")}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Garis Pembatas"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">―</span>
                      <span>Pembatas</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertHTML", `<table style="width:100%; border-collapse:collapse; margin:16px 0;"><thead><tr><th style="border:1px solid #e5e7eb; padding:8px;">Header 1</th><th style="border:1px solid #e5e7eb; padding:8px;">Header 2</th></tr></thead><tbody><tr><td style="border:1px solid #e5e7eb; padding:8px;">Isi 1</td><td style="border:1px solid #e5e7eb; padding:8px;">Isi 2</td></tr></tbody></table>`)}
                      className="px-2.5 py-1.5 bg-white shadow-sm border border-gray-200 hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Tabel"
                    >
                      <TableIcon className="w-3 h-3 text-[#990202]" />
                      <span>Tabel</span>
                    </button>
                  </div>

                  {/* WYSIWYG Content Editor */}
                  <div className="relative shadow-sm border border-gray-200 rounded-xl overflow-hidden shadow-inner">
                    <div
                      id="article-content-editor"
                      ref={editorRef}
                      contentEditable={true}
                      onInput={handleEditorInput}
                      onClick={handleEditorClick}
                      data-placeholder="Tuliskan isi lengkap artikel Anda di sini. Klik tombol di atas untuk memformat secara langsung..."
                      className="w-full bg-white px-4 py-3.5 text-[16px] focus:outline-none transition-all font-medium text-gray-950 min-h-[350px] max-h-[600px] overflow-y-auto prose-editor"
                    />
                  </div>

                  {/* Link Insertion Modal */}
                  {showLinkModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onMouseDown={(e) => { if (e.target === e.currentTarget) { setShowLinkModal(false); setLinkUrl(""); } }}>
                      <div className="bg-white rounded-2xl shadow-2xl shadow-sm border border-gray-200 p-5 w-full max-w-md mx-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ExternalLink className="w-4 h-4 text-[#990202]" />
                          <h3 className="text-[16px] font-extrabold text-gray-900">Sisipkan Link</h3>
                        </div>
                        <input
                          type="url"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyLink(); } }}
                          placeholder="https://example.com"
                          autoFocus
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => { setShowLinkModal(false); setLinkUrl(""); }}
                            className="px-4 py-2 text-[16px] font-bold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleApplyLink}
                            disabled={!linkUrl.trim()}
                            className="px-4 py-2 bg-[#990202] text-white text-[16px] font-bold rounded-lg hover:bg-[#7a0101] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            Pasang Link
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Insertion Modal */}
                  {showImageModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onMouseDown={(e) => { if (e.target === e.currentTarget) { setShowImageModal(false); setImageUrl(""); setImageAlt(""); } }}>
                      <div className="bg-white rounded-2xl shadow-2xl shadow-sm border border-gray-200 p-5 w-full max-w-md mx-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="w-4 h-4 text-[#990202]" />
                          <h3 className="text-[16px] font-extrabold text-gray-900">{isEditingImage ? "Ganti Gambar" : "Sisipkan Gambar"}</h3>
                        </div>

                        {/* Upload option */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Upload File</label>
                          <input
                            ref={imageFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imageFileInputRef.current?.click()}
                            disabled={isCompressing || isUploadingImage}
                            className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-[16px] font-bold text-gray-500 hover:border-[#990202] hover:text-[#990202] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingImage ? (
                              <>
                                <Cloud className="w-4 h-4 animate-pulse" />
                                <span>Mengunggah ke CDN...</span>
                              </>
                            ) : isCompressing ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Mengompres gambar...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Pilih Gambar dari Komputer</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* URL option */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Atau Input URL</label>
                          <input
                            type="url"
                            value={imageUrl.startsWith("blob:") ? "" : imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleInsertImage(); } }}
                            placeholder="https://example.com/gambar.jpg"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                          />
                        </div>

                        {/* Alt text */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Alt Text (Opsional)</label>
                          <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleInsertImage(); } }}
                            placeholder="Deskripsi singkat gambar"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                          />
                        </div>

                        {/* Preview */}
                        {imageUrl && (
                          <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-black/[0.02] bg-gray-50">
                            <img
                              src={imageUrl}
                              alt={imageAlt || "Preview"}
                              className="w-full max-h-[200px] object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          </div>
                        )}

                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => { setShowImageModal(false); setImageUrl(""); setImageAlt(""); }}
                            className="px-4 py-2 text-[16px] font-bold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleInsertImage}
                            disabled={!imageUrl.trim()}
                            className="px-4 py-2 bg-[#990202] text-white text-[16px] font-bold rounded-lg hover:bg-[#7a0101] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            {isEditingImage ? "Ganti Gambar" : "Pasang Gambar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Style for WYSIWYG editor placeholders and layout elements */}
                  <style>{`
                    .prose-editor:empty::before {
                      content: attr(data-placeholder);
                      color: #9ca3af;
                      font-style: italic;
                      cursor: text;
                    }
                    .prose-editor h3 {
                      font-family: var(--font-heading), sans-serif;
                      font-size: 17px !important;
                      font-weight: 800 !important;
                      color: #030712 !important;
                      border-left: 4px solid #990202 !important;
                      padding-left: 10px !important;
                      margin-top: 20px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor strong {
                      font-weight: 800 !important;
                      color: #111827 !important;
                    }
                    .prose-editor p, .prose-editor div {
                      font-size: 14.5px !important;
                      color: #4b5563 !important;
                      line-height: 1.7 !important;
                      margin-top: 8px !important;
                      margin-bottom: 8px !important;
                    }
                    .prose-editor ul {
                      list-style-type: none !important;
                      padding-left: 0 !important;
                      margin-top: 10px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor ul li {
                      position: relative !important;
                      padding-left: 20px !important;
                      font-size: 14px !important;
                      color: #4b5563 !important;
                      margin-top: 4px !important;
                    }
                    .prose-editor ul li::before {
                      content: "" !important;
                      position: absolute !important;
                      left: 0 !important;
                      top: 8px !important;
                      width: 6px !important;
                      height: 6px !important;
                      border-radius: 9999px !important;
                      background-color: rgba(153, 2, 2, 0.7) !important;
                    }
                    .prose-editor ol {
                      counter-reset: item !important;
                      list-style-type: none !important;
                      padding-left: 0 !important;
                      margin-top: 10px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor ol li {
                      display: flex !important;
                      align-items: flex-start !important;
                      font-size: 14px !important;
                      color: #4b5563 !important;
                      margin-top: 6px !important;
                    }
                    .prose-editor ol li::before {
                      content: counter(item) !important;
                      counter-increment: item !important;
                      display: inline-flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      width: 18px !important;
                      height: 18px !important;
                      border-radius: 6px !important;
                      background-color: #fef2f2 !important;
                      border: 1px solid rgba(254, 242, 242, 0.4) !important;
                      color: #990202 !important;
                      font-size: 10px !important;
                      font-weight: 900 !important;
                      margin-right: 10px !important;
                      flex-shrink: 0 !important;
                      margin-top: 2px !important;
                    }
                    .prose-editor hr {
                      border: 0 !important;
                      border-top: 1px solid #e5e7eb !important;
                      margin-top: 20px !important;
                      margin-bottom: 20px !important;
                    }
                    .prose-editor a {
                      color: #2563eb !important;
                      text-decoration: underline !important;
                      cursor: pointer !important;
                    }
                    .prose-editor a:hover {
                      color: #B91C1C !important;
                    }
                    .prose-editor table {
                      width: 100% !important;
                      border-collapse: collapse !important;
                      margin-top: 16px !important;
                      margin-bottom: 16px !important;
                    }
                    .prose-editor th, .prose-editor td {
                      border: 1px solid #e5e7eb !important;
                      padding: 8px !important;
                      font-size: 14px !important;
                    }
                    .prose-editor th {
                      background-color: #f9fafb !important;
                      font-weight: 700 !important;
                      color: #111827 !important;
                    }
                  `}</style>

                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="hidden"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled={isPending || aiReview?.duplicateCheck?.blocked} className="w-full py-4 text-[16px] font-extrabold rounded-xl bg-[#990202] text-white hover:bg-[#7a0101] disabled:opacity-50">
                    {isPending ? "Memeriksa & Menyimpan..." : aiReview?.duplicateCheck?.blocked ? "Artikel Terlalu Mirip — Perlu Diubah" : "Terbitkan Artikel Baru"}
                  </button>
                </div>

              </form>
            </div>

            {/* LIVE PREVIEW */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">

              <div className="bg-white shadow-sm border border-gray-200 rounded-2xl py-3 px-4 flex items-center justify-between">
                <div className="text-[16px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pratinjau Langsung (Live Preview)</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* SEO Analysis Card */}
              <div className={`bg-white rounded-xl shadow-md border p-5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] space-y-4 transition-colors ${seoData.bgCardColor}`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-5 h-5 ${seoData.statusColor}`} />
                    <span className="text-[16px] font-extrabold text-gray-900">
                      Analisis SEO (Yoast Style)
                    </span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[14px] font-black uppercase tracking-wide border ${seoData.bgIconColor} border-current/20`}>
                    {seoData.status} ({seoData.percentage}%)
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {seoData.checks.map((check, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[15px] font-medium leading-snug text-gray-700">
                      <div className="mt-0.5 flex-shrink-0">
                        {check.type === "success" && <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />}
                        {check.type === "warning" && <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />}
                        {check.type === "error" && <XCircle className="w-4.5 h-4.5 text-red-500" />}
                      </div>
                      <span>{check.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.03)] flex flex-col group transition-all duration-300">
                <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={getPreviewImage()}
                    alt="Cover preview"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex px-3 py-1.5 rounded-lg text-[16px] font-black uppercase tracking-wider bg-white text-[#990202] shadow-sm border border-red-50">
                      {category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-[16px] font-bold text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>Hari ini</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>{readTime || "5 menit baca"}</span>
                      </div>
                    </div>
                    <h3 className="font-heading text-[16px] sm:text-[16px] font-extrabold text-gray-950 leading-snug line-clamp-2">
                      {title || "Judul artikel Anda akan tampil di sini..."}
                    </h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-normal line-clamp-3">
                      {excerpt || "Tulis kutipan singkat pada form di sebelah kiri untuk melihat gambaran pratinjau cuplikan artikel di sini..."}
                    </p>
                  </div>
                  <div className="flex items-center text-[16px] font-extrabold text-[#990202] mt-6 pt-4 border-t border-gray-100">
                    <span>Baca Selengkapnya</span>
                    <span className="ml-1.5">→</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-5 leading-relaxed text-[16px] text-amber-800 font-medium">
                <div className="font-extrabold text-[16px] mb-1.5 text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Tips Menulis Artikel Populer</span>
                </div>
                Gunakan judul yang memancing rasa ingin tahu, lengkapi dengan kutipan pendek yang persuasif, dan tulislah sub-bab menggunakan format heading <code className="bg-amber-100/60 px-1.5 py-0.5 rounded font-black text-amber-950">###</code> agar artikel tersusun secara rapi dan mudah dibaca oleh klien.
              </div>

              {/* Format Cheat Sheet Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <FileText className="w-5 h-5 text-[#990202]" />
                  <span className="text-[16px] font-extrabold text-gray-900">
                    Contoh Hasil Tampilan Format
                  </span>
                </div>

                <div className="space-y-4 text-[16px] leading-relaxed text-gray-600">
                  {/* Heading H3 */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Sub-judul (H3)
                    </div>
                    <div className="border-l-4 border-[#990202] pl-3 py-0.5 font-extrabold text-gray-950 text-[16px]">
                      Contoh Judul Sub-bab
                    </div>
                  </div>

                  {/* Bold text */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Teks Tebal
                    </div>
                    <div className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] font-medium">
                      Menjamin <strong className="font-extrabold text-gray-900">pemisahan harta pribadi</strong> secara hukum.
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Daftar Poin (Bullet List)
                    </div>
                    <ul className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] list-none pl-0 space-y-1.5 font-medium">
                      <li className="relative pl-4 flex items-center">
                        <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                        <span>Dokumen Akta Pendirian</span>
                      </li>
                      <li className="relative pl-4 flex items-center">
                        <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                        <span>Pengesahan Kemenkumham</span>
                      </li>
                    </ul>
                  </div>

                  {/* Numbered List */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Daftar Angka (Numbered List)
                    </div>
                    <ol className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] list-none pl-0 space-y-1.5 font-medium">
                      <li className="flex items-center">
                        <span className="w-4.5 h-4.5 bg-red-50 text-[#990202] text-[16px] font-black rounded flex items-center justify-center mr-2 border border-red-100/40">1</span>
                        <span>Registrasi akun OSS</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-4.5 h-4.5 bg-red-50 text-[#990202] text-[16px] font-black rounded flex items-center justify-center mr-2 border border-red-100/40">2</span>
                        <span>Penerbitan NIB</span>
                      </li>
                    </ol>
                  </div>

                  {/* Horizontal Rule */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Garis Pembatas
                    </div>
                    <div className="bg-gray-50/50 py-2.5 px-2 rounded-lg shadow-sm border border-black/[0.02] flex items-center justify-center">
                      <hr className="w-full border-gray-200" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <AICompanionGuide
        items={companionGuidance}
        isThinking={aiReviewLoading}
        onDismiss={(item) => {
          setResolvedGuidanceKeys((prev) => {
            const next = new Set(prev);
            next.add(guidanceResolvedKey(item.targetId, item.message));
            return next;
          });
        }}
      />

    </div>
  );
}

// Simple custom markdown renderer to ensure clean semantic HTML with premium styling
function renderMarkdownContent(text: string) {
  const blocks = text.split("\n\n");
  let headingCounter = 0;

  return blocks.map((block, idx) => {
    const trimmed = block.trim();

    // Horizontal Rule
    if (trimmed === "---") {
      return <hr key={idx} className="my-6 border-gray-200/60" />;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      headingCounter++;
      const headingText = trimmed.replace("### ", "");
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          key={idx}
          id={headingId}
          className="font-heading text-[16px] sm:text-[16px] font-extrabold text-gray-950 mt-6 mb-3 leading-tight flex items-center scroll-mt-24 border-l-4 border-[#990202] pl-2.5"
        >
          {headingText}
        </h3>
      );
    }

    // Bullet Lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((li) => li.replace(/^[\*\-]\s+/, ""));
      return (
        <ul key={idx} className="space-y-2 my-4 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[16px] leading-relaxed text-gray-600 relative pl-5 flex items-start">
                <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").map((li) => li.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={idx} className="space-y-2 my-4 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[16px] leading-relaxed text-gray-600 flex items-start">
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-red-50 text-[#990202] text-[16px] font-black mr-2.5 flex-shrink-0 mt-0.5 border border-red-100/40">
                  {itemIdx + 1}
                </span>
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Default Paragraph with Bold text parser
    return (
      <p key={idx} className="text-[16px] leading-[1.7] text-gray-600 font-normal my-3">
        {parseBoldText(trimmed)}
      </p>
    );
  });
}

// Utility to parse **bold** text to standard JSX strong tags
function parseBoldText(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-extrabold text-gray-900">
          {part}
        </strong>
      );
    }
    return part;
  });
}

// Bi-directional Parsers: Convert Markdown to HTML for editor, and HTML back to Markdown for database

function markdownToHtml(markdown: string): string {
  if (!markdown) return "";
  
  const normalized = markdown.replace(/\r\n/g, "\n");
  const blocks = normalized.split(/\n\n+/);
  
  const htmlBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    
    // Horizontal rule
    if (trimmed === "---") {
      return "<hr>";
    }
    
    // Image (standalone block)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return `<img src="${imgMatch[2]}" alt="${imgMatch[1]}" style="max-width:100%;border-radius:12px;margin:16px 0;display:block" />`;
    }
    
    // Table
    if (trimmed.startsWith("|") && trimmed.includes("|\n|")) {
      const rows = trimmed.split("\n").filter(r => r.trim() !== "");
      let html = '<table style="width:100%; border-collapse:collapse; margin:16px 0;">';
      rows.forEach((row, idx) => {
        if (row.match(/^\|\s*:?-+:?\s*\|/)) return; // Skip separator row
        const cells = row.split("|").filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
        if (idx === 0) {
          html += '<thead><tr>';
          cells.forEach(cell => {
            html += `<th style="border:1px solid #e5e7eb; padding:8px; font-weight:700; background-color:#f9fafb;">${parseMarkdownInlineHtml(cell.trim())}</th>`;
          });
          html += '</tr></thead><tbody>';
        } else {
          html += '<tr>';
          cells.forEach(cell => {
            html += `<td style="border:1px solid #e5e7eb; padding:8px;">${parseMarkdownInlineHtml(cell.trim())}</td>`;
          });
          html += '</tr>';
        }
      });
      html += '</tbody></table>';
      return html;
    }
    
    // Headings
    if (trimmed.startsWith("### ")) {
      const text = trimmed.substring(4);
      return `<h3>${parseMarkdownInlineHtml(text)}</h3>`;
    }
    
    // Unordered list
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map(li => {
        const itemText = li.replace(/^[\*\-]\s+/, "");
        return `<li>${parseMarkdownInlineHtml(itemText)}</li>`;
      });
      return `<ul>${items.join("")}</ul>`;
    }
    
    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").map(li => {
        const itemText = li.replace(/^\d+\.\s+/, "");
        return `<li>${parseMarkdownInlineHtml(itemText)}</li>`;
      });
      return `<ol>${items.join("")}</ol>`;
    }
    
    // Default Paragraph
    return `<p>${parseMarkdownInlineHtml(trimmed)}</p>`;
  });
  
  return htmlBlocks.filter(b => b !== "").join("");
}

function parseMarkdownInlineHtml(text: string): string {
  // Images: ![alt](url) -> <img>
  let result = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:12px;margin:8px 0;display:inline-block;vertical-align:middle" />');
  // Links: [text](url) -> <a href="url">text</a>
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Bold: **text** -> <strong>text</strong>
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return result;
}

function htmlToMarkdown(html: string): string {
  if (typeof window === "undefined") return "";
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;
  
  const markdownBlocks: string[] = [];
  
  // Helper to extract text from a node converting specific formatting tags
  function getInlineMarkdown(element: HTMLElement): string {
    let md = "";
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        md += node.textContent || "";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const nodeName = el.nodeName.toUpperCase();
        if (nodeName === "STRONG" || nodeName === "B") {
          md += `**${el.textContent || ""}**`;
        } else if (nodeName === "A") {
          const href = el.getAttribute("href") || "#";
          const linkText = el.textContent || "";
          md += `[${linkText}](${href})`;
        } else if (nodeName === "IMG") {
          const src = el.getAttribute("src") || "";
          const alt = el.getAttribute("alt") || "";
          md += `![${alt}](${src})`;
        } else if (nodeName === "BR") {
          md += "\n";
        } else {
          md += getInlineMarkdown(el);
        }
      }
    });
    return md;
  }
  
  // Traverse top-level nodes of the body
  Array.from(body.childNodes).forEach(node => {
    const nodeName = node.nodeName.toUpperCase();
    
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent?.trim();
      if (txt) {
        markdownBlocks.push(txt);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      
      if (nodeName === "H3") {
        markdownBlocks.push(`### ${getInlineMarkdown(el)}`);
      } else if (nodeName === "IMG") {
        const src = el.getAttribute("src") || "";
        const alt = el.getAttribute("alt") || "";
        markdownBlocks.push(`![${alt}](${src})`);
      } else if (nodeName === "UL") {
        const items: string[] = [];
        Array.from(el.querySelectorAll("li")).forEach(li => {
          items.push(`* ${getInlineMarkdown(li)}`);
        });
        if (items.length > 0) {
          markdownBlocks.push(items.join("\n"));
        }
      } else if (nodeName === "OL") {
        const items: string[] = [];
        Array.from(el.querySelectorAll("li")).forEach((li, idx) => {
          items.push(`${idx + 1}. ${getInlineMarkdown(li)}`);
        });
        if (items.length > 0) {
          markdownBlocks.push(items.join("\n"));
        }
      } else if (nodeName === "TABLE") {
        const tableLines: string[] = [];
        const rows = Array.from(el.querySelectorAll("tr"));
        rows.forEach((row, idx) => {
          const cells = Array.from(row.querySelectorAll("th, td"));
          if (cells.length === 0) return;
          const rowMd = "| " + cells.map(cell => getInlineMarkdown(cell as HTMLElement).trim()).join(" | ") + " |";
          tableLines.push(rowMd);
          
          const inThead = row.closest("thead");
          const isOnlyTh = cells.every(c => c.tagName === "TH");
          
          if (idx === 0 && (inThead || isOnlyTh)) {
             tableLines.push("|" + cells.map(() => "---").join("|") + "|");
          } else if (idx === 0 && tableLines.length === 1 && !inThead) {
             tableLines.push("|" + cells.map(() => "---").join("|") + "|");
          }
        });
        if (tableLines.length > 0) {
          markdownBlocks.push(tableLines.join("\n"));
        }
      } else if (nodeName === "HR") {
        markdownBlocks.push("---");
      } else if (nodeName === "P" || nodeName === "DIV") {
        const content = getInlineMarkdown(el).trim();
        if (content) {
          markdownBlocks.push(content);
        }
      } else if (nodeName === "BR") {
        // Line break
      } else {
        const content = getInlineMarkdown(el).trim();
        if (content) {
          markdownBlocks.push(content);
        }
      }
    }
  });
  
  return markdownBlocks.join("\n\n");
}
