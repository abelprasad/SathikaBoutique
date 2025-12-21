// Animation variants and utilities for consistent animations across the app

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// Button press animation
export const buttonTap = {
  scale: 0.97,
};

// Badge pulse animation
export const badgePulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Cart badge bounce when item added
export const cartBadgeBounce = {
  scale: [1, 1.3, 1],
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

// Shake animation for errors
export const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: {
    duration: 0.4,
  },
};

// Modal/Dialog animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },
};

// Skeleton shimmer effect
export const shimmer = {
  backgroundPosition: ['-200% 0', '200% 0'],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  },
};
