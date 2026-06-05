import { motion } from 'framer-motion';

interface InteractiveMascotProps {
  focusedField: 'email' | 'password' | null;
  mousePos: { x: number; y: number };
  hasError: boolean;
}

export function InteractiveMascot({ focusedField, mousePos, hasError }: InteractiveMascotProps) {
  const isPassword = focusedField === 'password';
  const isEmail = focusedField === 'email';

  // Eye movement
  const eyeX = hasError ? 0 : isPassword ? 0 : isEmail ? -6 : mousePos.x * 8;
  const eyeY = hasError ? 6 : isPassword ? 0 : isEmail ? 4 : mousePos.y * 6;
  const eyeScaleY = isPassword ? 0.15 : 1;

  // Eye shape — sad droopy eyes on error
  const eyeRx = hasError ? 7 : 8;
  const eyeRy = hasError ? 8 : 12;

  // Head tilt
  const headRotate = hasError ? 0 : isPassword ? 4 : isEmail ? -6 : mousePos.x * 5;
  const headX = hasError ? 0 : isPassword ? 0 : isEmail ? -4 : mousePos.x * 4;
  const headY = hasError ? 6 : isPassword ? 4 : isEmail ? 2 : mousePos.y * 3;

  // Arm variants
  const leftArmVariants = {
    idle: { x: 0, y: 0, rotate: 0 },
    password: { x: 38, y: -72, rotate: 135 },
  };
  const rightArmVariants = {
    idle: { x: 0, y: 0, rotate: 0 },
    password: { x: -38, y: -72, rotate: -135 },
  };
  const currentArmStatus = isPassword ? 'password' : 'idle';

  // Color tints for error
  const bodyStroke = hasError ? '#F43F5E' : '#818CF8';
  const eyeColor = hasError ? '#FCA5A5' : '#38BDF8';
  const antennaColor = hasError ? '#F43F5E' : '#C084FC';
  const antennaBallColor = hasError ? '#FB7185' : '#818CF8';
  const handColor = hasError ? '#FB7185' : '#818CF8';

  // Mouth path: smile, flat, or sad
  const mouthPath = hasError
    ? 'M92 94 Q100 88 108 94'   // Sad frown
    : isPassword
      ? 'M94 92 H106'           // Flat line
      : 'M94 90 Q100 96 106 90'; // Smile

  return (
    <motion.svg
      className="login-mascot"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={
        hasError
          ? { x: [0, -8, 8, -6, 6, -3, 3, 0], y: [0, -12, 0] }
          : { y: [0, -12, 0] }
      }
      transition={
        hasError
          ? { x: { duration: 0.5, ease: 'easeInOut' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
          : { y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
      }
    >
      {/* Neck */}
      <rect x="90" y="122" width="20" height="15" rx="3" fill="#475569" />

      {/* Body */}
      <motion.rect
        x="60" y="135" width="80" height="50" rx="15" fill="#1E293B"
        stroke={bodyStroke} strokeWidth="4"
        animate={{ stroke: bodyStroke }}
        transition={{ duration: 0.3 }}
      />

      {/* Body Screen */}
      <rect x="75" y="145" width="50" height="25" rx="5" fill="#0F172A" />
      {hasError ? (
        /* X mark on error */
        <>
          <line x1="90" y1="152" x2="100" y2="162" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="152" x2="90" y2="162" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        /* Code symbol */
        <>
          <path d="M85 152 L90 157 L85 162" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="94" y1="162" x2="105" y2="162" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Head Group */}
      <motion.g
        animate={{ rotate: headRotate, x: headX, y: headY }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        {/* Antenna */}
        <motion.rect
          x="95" y="15" width="10" height="25" rx="5"
          fill={antennaColor}
          animate={{ fill: antennaColor }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="100" cy="12" r="8"
          fill={antennaBallColor}
          animate={{ fill: antennaBallColor }}
          transition={{ duration: 0.3 }}
        />

        {/* Ears */}
        <rect x="40" y="70" width="15" height="30" rx="5" fill="#475569" />
        <rect x="145" y="70" width="15" height="30" rx="5" fill="#475569" />

        {/* Head Base */}
        <motion.rect
          x="50" y="40" width="100" height="80" rx="20" fill="#1E293B"
          stroke={bodyStroke} strokeWidth="4"
          animate={{ stroke: bodyStroke }}
          transition={{ duration: 0.3 }}
        />

        {/* Face Screen */}
        <rect x="62" y="52" width="76" height="56" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />

        {/* Blush — hidden on password and error */}
        {!isPassword && !hasError && (
          <>
            <circle cx="72" cy="92" r="5" fill="#F43F5E" opacity="0.5" />
            <circle cx="128" cy="92" r="5" fill="#F43F5E" opacity="0.5" />
          </>
        )}

        {/* Sweat drop on error */}
        {hasError && (
          <motion.ellipse
            cx="138" cy="58" rx="3" ry="5"
            fill="#60A5FA"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-4, 0, 4, 10] }}
            transition={{ duration: 1.2, repeat: 1 }}
          />
        )}

        {/* Eyebrows on error (sad/worried) */}
        {hasError && (
          <>
            <motion.line
              x1="72" y1="62" x2="86" y2="58"
              stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="128" y1="62" x2="114" y2="58"
              stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </>
        )}

        {/* Eyes Group */}
        <motion.g
          animate={{ x: eyeX, y: eyeY }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
          <motion.ellipse
            cx="82" cy="76" rx={eyeRx} ry={eyeRy}
            style={{ originY: 0.5 }}
            animate={{ scaleY: eyeScaleY, fill: eyeColor }}
            transition={{ duration: 0.15 }}
          />
          <motion.ellipse
            cx="118" cy="76" rx={eyeRx} ry={eyeRy}
            style={{ originY: 0.5 }}
            animate={{ scaleY: eyeScaleY, fill: eyeColor }}
            transition={{ duration: 0.15 }}
          />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d={mouthPath}
          stroke={eyeColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ d: mouthPath, stroke: eyeColor }}
          transition={{ duration: 0.2 }}
        />
      </motion.g>

      {/* Left Hand */}
      <motion.g
        animate={currentArmStatus}
        variants={leftArmVariants}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        style={{ originX: '48px', originY: '155px' }}
      >
        <motion.circle
          cx="48" cy="155" r="9"
          fill={handColor}
          animate={{ fill: handColor }}
          transition={{ duration: 0.3 }}
        />
      </motion.g>

      {/* Right Hand */}
      <motion.g
        animate={currentArmStatus}
        variants={rightArmVariants}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        style={{ originX: '152px', originY: '155px' }}
      >
        <motion.circle
          cx="152" cy="155" r="9"
          fill={handColor}
          animate={{ fill: handColor }}
          transition={{ duration: 0.3 }}
        />
      </motion.g>
    </motion.svg>
  );
}
