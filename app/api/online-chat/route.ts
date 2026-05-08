import { NextRequest } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const messages = body?.messages || []

    const prompt = messages
      .map((message: any) => {
        const role =
          message.role === "assistant"
            ? "Assistant"
            : "User"

        return `${role}: ${message.content}`
      })
      .join("\n\n")

    const response = await fetch(
      "https://api.thehatch.store/api/online-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt
        }),
        cache: "no-store"
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(
        data?.error || "Online AI failed",
        {
          status: response.status
        }
      )
    }

    return new Response(
      data?.response || "No response generated.",
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    )

  } catch (error: any) {

    console.error(error)

    return new Response(
      error?.message || "Online AI failed",
      {
        status: 500
      }
    )
  }
}
