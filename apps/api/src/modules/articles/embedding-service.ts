const EMBEDDING_DIMENSIONS = 512
const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings"

export interface EmbeddingResult {
  vector: number[]
  dims: number
}

export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("OPENAI_API_KEY missing")

  const input = text.trim()
  if (!input) throw new Error("embedding input required")

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const response = await fetch(OPENAI_EMBEDDINGS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: input.slice(0, 8000),
        dimensions: EMBEDDING_DIMENSIONS,
        encoding_format: "float",
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`OpenAI embedding failed: ${response.status}`)
    }

    const data = await response.json() as {
      data?: Array<{ embedding?: number[] }>
    }

    const vector = data.data?.[0]?.embedding

    if (
      !Array.isArray(vector) ||
      vector.length !== EMBEDDING_DIMENSIONS ||
      !vector.every(Number.isFinite)
    ) {
      throw new Error("Invalid OpenAI embedding response")
    }

    return { vector, dims: vector.length }
  } finally {
    clearTimeout(timeout)
  }
}

export async function generateBatchEmbeddings(
  texts: string[],
): Promise<EmbeddingResult[]> {
  return Promise.all(texts.map(generateEmbedding))
}
