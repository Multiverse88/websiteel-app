/**
 * Local text embedding via @xenova/transformers
 * Model: paraphrase-multilingual-MiniLM-L12-v2 (384 dims)
 * Downloaded automatically from HuggingFace on first run, cached locally.
 */
import { pipeline } from "@xenova/transformers";

const MODEL_ID = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
const CACHE_DIR = process.env.XENOVA_CACHE_DIR || "./node_modules/.cache/xenova";

let _model: any = null;
let _initPromise: Promise<any> | null = null;

async function getModel(): Promise<any> {
  if (_model) return _model;
  if (!_initPromise) {
    _initPromise = pipeline("feature-extraction", MODEL_ID, {
      cacheDir: CACHE_DIR,
    }).then((p: any) => {
      _model = p;
      return p;
    });
  }
  return _initPromise;
}

export interface EmbeddingResult {
  vector: number[];
  dims: number;
}

export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  const model = await getModel();
  const trimmed = text.trim().slice(0, 2000);
  if (!trimmed) return { vector: new Array(384).fill(0), dims: 384 };

  const output = await model(trimmed, { pooling: "mean", normalize: true }) as any;
  const vector = Array.from(output.data as Float32Array);
  return { vector, dims: vector.length };
}

export async function generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
  return Promise.all(texts.map((t) => generateEmbedding(t)));
}
