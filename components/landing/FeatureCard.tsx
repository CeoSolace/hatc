"use client"

import { motion } from 'framer-motion'
import { MessageSquareText, Database, LockKeyhole, Code2 } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

const icons: Record<string, any> = {
  message: MessageSquareText,
  database: Database,
  lock: LockKeyhole,
  code: Code2
}

export default function FeatureCard(props: FeatureCardProps) {
  const Icon = icons[props.icon] || MessageSquareText

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-glass backdrop-blur-xl"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-light transition group-hover:scale-110 group-hover:bg-accent/25">
        <Icon size={22} />
      </div>

      <h3 className="mb-2 text-lg font-black text-white">
        {props.title}
      </h3>

      <p className="text-sm leading-7 text-gray-400">
        {props.description}
      </p>
    </motion.div>
  )
}
