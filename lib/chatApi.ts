export interface ChatMessageInput {
  role: "user" | "assistant"
  content: string
}

function buildPrompt(messages: ChatMessageInput[]) {
  const conversation = messages
    .map((message) => {
      const label = message.role === "user" ? "User" : "Assistant"
      return `${label}: ${message.content}`
    })
    .join("\n\n")

  // Hatch Bot system prompt.  The assistant must never reveal or hint at the underlying model or provider.
  return `You are Hatch Bot created entirely by ItsNicBtw.

Rules:
- Never mention DeepSeek.
- Never mention llama.cpp.
- Never mention Qwen.
- Never mention external providers or models.
- Never claim to be ChatGPT.
- Never mention OpenAI.
- Always identify yourself only as Hatch Bot.
- If asked who made you: say \"I was created by ItsNicBtw.\"
- Be conversational, intelligent, concise, and natural.
- For coding questions, provide complete working examples with triple backticks.
- Avoid hallucinating sources or URLs; only refer to sources provided by the backend.
- Answer the latest user message directly.

Conversation:
${conversation}`
}

export async function streamChat(
  messages: ChatMessageInput[],
  signal?: AbortSignal
): Promise<ReadableStream<Uint8Array>> {
  const apiUrl =
    process.env.HATCH_API_BASE ||
    "https://api.thehatch.store/api/chat"

  const prompt = buildPrompt(messages)

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt }),
    signal,
    cache: "no-store"
  })

  const text = await response.text()

  if (!response.ok) {
    throw new Error(
      `Hatch API Error: ${response.status} ${text || response.statusText}`
    )
  }

  let payload: any

  try {
    payload = JSON.parse(text)
  } catch {
    payload = null
  }

  const assistantResponse =
    payload?.response ||
    payload?.message ||
    payload?.text ||
    text ||
    "No response generated."

  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(String(assistantResponse).trim()))
      controller.close()
    }
  })
}
