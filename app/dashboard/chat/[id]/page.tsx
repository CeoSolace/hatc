import Chat from "@/components/chat/Chat"

export default function ConversationPage({
  params
}: {
  params: {
    id: string
  }
}) {

  return (
    <Chat
      conversationId={params.id}
    />
  )
}
