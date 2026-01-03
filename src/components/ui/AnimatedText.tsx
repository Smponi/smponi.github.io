import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03
}: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface TypewriterTextProps {
  texts: string[]
  className?: string
}

export function TypewriterText({ texts, className = '' }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {texts.map((text, textIndex) => (
        <motion.span
          key={textIndex}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: textIndex * 3,
            repeat: Infinity,
            repeatDelay: texts.length * 3 - 0.5,
          }}
        >
          {text.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: textIndex * 3 + charIndex * 0.05,
                repeat: Infinity,
                repeatDelay: texts.length * 3 - 0.05,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.span>
  )
}
