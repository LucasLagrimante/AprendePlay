import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { vibrate, VIBRATION_PATTERNS } from '../utils/vibrate';

interface GameButtonProps {
  /**
   * URL da imagem (OpenMoji)
   */
  icon: string;

  /**
   * Texto principal do botão
   */
  label: string;

  /**
   * Função executada ao clicar
   */
  onClick: () => void;

  /**
   * Ativar vibração ao clicar (default: true em mobile)
   */
  enableVibration?: boolean;

  /**
   * Classes Tailwind adicionais
   */
  className?: string;

  /**
   * Mostrar animação de loading
   */
  isLoading?: boolean;

  /**
   * Desabilitar o botão
   */
  disabled?: boolean;
}

/**
 * Componente GameButton com animações de gamificação
 * Reutilizável para números, letras, cores, etc.
 */
export function GameButton({
  icon,
  label,
  onClick,
  enableVibration = true,
  className = '',
  isLoading = false,
  disabled = false,
}: GameButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isLoading) return;

    // Criar efeito ripple
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id, x, y }]);

      // Remover ripple após animação
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    // Vibração
    if (enableVibration) {
      vibrate(VIBRATION_PATTERNS.tap);
    }

    // Executar callback
    setIsPlaying(true);
    onClick();

    // Voltar para estado normal após 1s
    setTimeout(() => {
      setIsPlaying(false);
    }, 1000);
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };

  const imageVariants = {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.92 },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover={!disabled && !isLoading ? 'whileHover' : {}}
      whileTap={!disabled && !isLoading ? 'whileTap' : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center p-4 m-2 cursor-pointer rounded-2xl transition-all duration-200 overflow-hidden group ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      {/* Fundo animado no hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={!disabled && !isLoading ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent)',
        }}
      />

      {/* Efeito de brilho */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={!disabled && !isLoading ? { opacity: 1 } : {}}
        animate={isPlaying ? { opacity: [0.5, 0] } : {}}
        transition={{ duration: 0.6 }}
        style={{
          boxShadow: '0 0 30px rgba(255,255,255,0.3)',
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            background: 'rgba(255,255,255,0.5)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
        initial={{ scale: 1 }}
        animate={isPlaying ? { scale: [1, 0.95, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Imagem */}
        <motion.img
          src={icon}
          alt={label}
          className="w-20 h-20 object-contain mb-2 select-none pointer-events-none"
          variants={imageVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          animate={isPlaying ? { rotate: [0, -5, 5, 0] } : {}}
        />

        {/* Texto */}
        <motion.p
          className="text-lg font-bold text-white text-center"
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.p>
      </motion.div>

      {/* Indicador de carregamento */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Sombra e borda dinâmica */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        whileHover={!disabled && !isLoading ? { borderColor: 'rgba(255,255,255,0.2)' } : {}}
        animate={isPlaying ? { boxShadow: '0 0 20px rgba(255,255,255,0.4)' } : {}}
        transition={{ duration: 0.3 }}
        style={{
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
