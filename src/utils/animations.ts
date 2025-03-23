
// Reusable animation variants for framer-motion

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)" },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const buttonTap = {
  rest: { scale: 1 },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

export const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    x: -50, 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const slideInRight = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    x: 50, 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};
