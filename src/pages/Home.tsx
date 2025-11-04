import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

interface MenuButtonProps {
  to: string
  label: string
  icon: string
  color: string
  gradient: string
}

interface MenuCategory {
  title: string
  icon: string
  buttons: MenuButtonProps[]
}

const MenuButton: React.FC<MenuButtonProps> = ({ to, label, icon, color, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Link
        to={to}
        className={`relative flex items-center justify-center w-full h-40 px-8 rounded-3xl font-bold text-2xl text-white text-center transition-all duration-300 overflow-hidden group`}
        style={{
          background: gradient,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Efeito de brilho sutil (antes do hover) */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 70%)`,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Efeito de hover com overlay brilhante */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}60, transparent 70%)`,
          }}
          transition={{
            duration: 0.3,
          }}
        />

        {/* Conteúdo */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3"
          initial={{ y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-5xl">{icon}</span>
          <span>{label}</span>
        </motion.div>

        {/* Sombra de hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 0 0 rgba(255, 255, 255, 0)',
          }}
          whileHover={{
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 0 0 3px rgba(255, 255, 255, 0.2)',
          }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
}

const CategorySection: React.FC<{ category: MenuCategory; index: number }> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="w-full"
    >
      {/* Category Header */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <motion.div
          className="flex-shrink-0 flex items-center justify-center"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">{category.icon}</span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{category.title}</h2>
      </div>

      {/* Category Buttons */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.buttons.map((button, buttonIndex) => (
          <motion.div
            key={button.to}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.1 + buttonIndex * 0.08,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <MenuButton {...button} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Home() {
  const { t } = useTranslation()

  const categories: MenuCategory[] = [
    {
      title: t('menu.learn') || 'Aprenda',
      icon: '📚',
      buttons: [
        {
          to: '/colors',
          label: t('menu.colors'),
          icon: '🎨',
          color: '#10B981',
          gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
        },
        {
          to: '/letters',
          label: t('menu.letters'),
          icon: '🔤',
          color: '#EC4899',
          gradient: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
        },
        {
          to: '/numbers',
          label: t('menu.numbers'),
          icon: '🔢',
          color: '#3B82F6',
          gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        },
      ]
    },
    {
      title: t('menu.play') || 'Jogue',
      icon: '🎮',
      buttons: [
        {
          to: '/colors-quiz',
          label: t('menu.colorsQuiz'),
          icon: '🎯',
          color: '#F59E0B',
          gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        },
      ]
    }
  ]

  return (
    <div className="flex flex-col items-center justify-start min-h-full text-white p-6 pb-12 overflow-y-auto">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-8 mb-6"
      >
        <img src={logo} alt="AprendePlay" className="h-40 md:h-48 w-auto" />
      </motion.div>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-3">{t('home.title')}</h1>
        <p className="text-lg md:text-xl opacity-90">{t('home.subtitle')}</p>
      </motion.div>

      {/* Categories */}
      <div className="w-full flex flex-col gap-16">
        {categories.map((category, index) => (
          <CategorySection key={category.title} category={category} index={index} />
        ))}
      </div>
    </div>
  )
}
