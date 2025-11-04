import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { speak } from '../utils/speak'
import { GameButton } from './GameButton'
import { motion } from 'framer-motion'

type Item = { id: string; pt: string; en: string; es?: string; icon: string; color?: string }

export default function CardAprendizado({ item }: { item: Item }) {
  const { i18n } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const langCode = i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US'
  const text = (item as any)[i18n.language] ?? item.pt
  const iconUrl = `https://cdn.jsdelivr.net/npm/openmoji@15.0.0/color/svg/${item.icon}.svg`

  const handleClick = () => {
    setIsPlaying(true)
    speak(text, langCode)
    setTimeout(() => setIsPlaying(false), 1000)
  }

  // Se for cor (não tem ícone SVG), renderizar com quadrado colorido
  if ((item as any).color) {
    return (
      <div className="relative h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden group relative h-full"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Fundo animado */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent)',
            }}
          />

          {/* Brilho no clique */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={isPlaying ? { opacity: [0.5, 0] } : {}}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: '0 0 30px rgba(255,255,255,0.3)',
            }}
          />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-2 md:gap-4">
            <motion.div
              className="rounded-lg border-2 border-white/30 shadow-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              style={{ backgroundColor: (item as any).color }}
              animate={isPlaying ? { rotate: [0, -5, 5, 0], scale: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="text-sm sm:text-base md:text-lg font-bold text-white text-center px-2"
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {text}
            </motion.p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Para números e letras com ícones SVG, usar GameButton
  return <GameButton icon={iconUrl} label={text} onClick={handleClick} />
}
