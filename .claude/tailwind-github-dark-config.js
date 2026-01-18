/**
 * Tailwind CSS Configuration - GitHub Dark-Theme
 *
 * Komplette Tailwind-Konfiguration mit GitHub Dark-Mode Farben
 *
 * Verwendung:
 * 1. Kopiere diese Konfiguration in tailwind.config.js
 * 2. Führe `npm install -D tailwindcss` aus
 * 3. Nutze die Utility-Klassen wie: bg-github-primary, text-github-default, etc.
 */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class', // Enables class-based dark mode switching

  theme: {
    extend: {
      // ===== COLORS =====
      colors: {
        // Primary Background
        'github-primary': '#0d1117',
        'github-secondary': '#161b22',
        'github-tertiary': '#21262d',
        'github-hover': '#30363d',
        'github-focus': '#3d444d',

        // Text/Foreground
        'github-text': '#c9d1d9',
        'github-text-muted': '#8b949e',
        'github-text-subtle': '#6e7681',
        'github-text-disabled': '#6e7681',
        'github-text-on-primary': '#ffffff',

        // Accent (Primary Blue)
        'github-accent': '#58a6ff',
        'github-accent-secondary': '#388bfd',
        'github-accent-emphasis': '#1f6feb',
        'github-accent-muted': '#388bfd',

        // Success (Green)
        'github-success': '#3fb950',
        'github-success-emphasis': '#238636',
        'github-success-muted': '#26843b',

        // Danger (Red)
        'github-danger': '#f85149',
        'github-danger-emphasis': '#da3633',
        'github-danger-muted': '#da3633',

        // Attention (Orange)
        'github-attention': '#d29922',
        'github-attention-emphasis': '#9e6a03',
        'github-attention-muted': '#9e6a03',

        // Done (Purple)
        'github-done': '#bc8ef7',
        'github-done-emphasis': '#8957e5',
        'github-done-muted': '#6e40c9',

        // Links
        'github-link': '#58a6ff',
        'github-link-hover': '#79c0ff',
        'github-link-active': '#1f6feb',
        'github-link-visited': '#bc8ef7',
        'github-link-secondary': '#8b949e',
        'github-link-muted': '#6e7681',

        // Borders
        'github-border': '#30363d',
        'github-border-muted': '#21262d',
        'github-border-subtle': '#161b22',
        'github-border-emphasis': '#444c56',

        // Status Colors
        'github-open': '#3fb950',
        'github-closed': '#8957e5',
        'github-draft': '#6e7681',
      },

      // ===== BACKGROUNDS (bg-* utilities) =====
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'github-canvas': '#0d1117',
        'github-canvas-overlay': '#010409',
        'github-canvas-inset': '#161b22',
        'github-canvas-subtle': '#161b22',
      }),

      // ===== TEXT COLORS (text-* utilities) =====
      textColor: (theme) => ({
        ...theme('colors'),
      }),

      // ===== BORDER COLORS (border-* utilities) =====
      borderColor: (theme) => ({
        ...theme('colors'),
        'github-default': '#30363d',
      }),

      // ===== SHADOWS =====
      boxShadow: {
        'github-xs': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'github-sm': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'github-md': '0 8px 16px rgba(0, 0, 0, 0.4)',
        'github-lg': '0 16px 32px rgba(0, 0, 0, 0.5)',
        'github-inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        'github-focus': '0 0 0 3px rgba(88, 166, 255, 0.2)',
      },

      // ===== SPACING =====
      spacing: {
        'github-xs': '4px',
        'github-sm': '8px',
        'github-md': '16px',
        'github-lg': '24px',
        'github-xl': '32px',
      },

      // ===== BORDER RADIUS =====
      borderRadius: {
        'github-sm': '4px',
        'github-md': '6px',
        'github-lg': '8px',
      },

      // ===== TRANSITIONS =====
      transitionDuration: {
        'github-fast': '0.15s',
        'github-base': '0.2s',
        'github-slow': '0.3s',
      },

      transitionTimingFunction: {
        'github': 'ease',
      },

      // ===== FONT SIZES =====
      fontSize: {
        'github-xs': '12px',
        'github-sm': '14px',
        'github-md': '16px',
        'github-lg': '18px',
        'github-xl': '24px',
        'github-2xl': '32px',
      },

      // ===== LINE HEIGHTS =====
      lineHeight: {
        'github-tight': '1.25',
        'github-base': '1.5',
        'github-relaxed': '1.75',
      },

      // ===== Z-INDEX =====
      zIndex: {
        'github-dropdown': '10',
        'github-sticky': '100',
        'github-modal': '1000',
        'github-tooltip': '1100',
      },

      // ===== CONTAINER QUERIES =====
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },

  // ===== PLUGINS =====
  plugins: [
    // Custom Plugin für zusätzliche GitHub-spezifische Utilities
    function ({ addComponents, theme }) {
      const buttons = {
        '.btn-github-primary': {
          backgroundColor: '#238636',
          color: '#ffffff',
          border: `1px solid ${theme('colors.github-border')}`,
          borderRadius: theme('borderRadius.github-md'),
          padding: '8px 16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: `all ${theme('transitionDuration.github-base')} ease`,
          '&:hover': {
            backgroundColor: '#2ea043',
            boxShadow: theme('boxShadow.github-sm'),
          },
          '&:active': {
            boxShadow: theme('boxShadow.github-inset'),
          },
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.github-accent')}`,
            outlineOffset: '2px',
          },
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
          },
        },

        '.btn-github-secondary': {
          backgroundColor: theme('colors.github-secondary'),
          color: theme('colors.github-text'),
          border: `1px solid ${theme('colors.github-border')}`,
          borderRadius: theme('borderRadius.github-md'),
          padding: '8px 16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: `all ${theme('transitionDuration.github-base')} ease`,
          '&:hover': {
            backgroundColor: theme('colors.github-hover'),
            borderColor: theme('colors.github-border-emphasis'),
          },
        },

        '.btn-github-danger': {
          backgroundColor: 'transparent',
          color: theme('colors.github-danger'),
          border: `1px solid rgba(248, 81, 73, 0.4)`,
          borderRadius: theme('borderRadius.github-md'),
          padding: '8px 16px',
          cursor: 'pointer',
          transition: `all ${theme('transitionDuration.github-base')} ease`,
          '&:hover': {
            backgroundColor: 'rgba(248, 81, 73, 0.1)',
            borderColor: theme('colors.github-danger-emphasis'),
          },
        },

        '.card-github': {
          backgroundColor: theme('colors.github-primary'),
          border: `1px solid ${theme('colors.github-border')}`,
          borderRadius: theme('borderRadius.github-md'),
          padding: theme('spacing.github-md'),
          transition: `all ${theme('transitionDuration.github-base')} ease`,
          '&:hover': {
            backgroundColor: theme('colors.github-secondary'),
            borderColor: theme('colors.github-border-emphasis'),
            boxShadow: theme('boxShadow.github-md'),
          },
        },

        '.input-github': {
          backgroundColor: theme('colors.github-primary'),
          color: theme('colors.github-text'),
          border: `1px solid ${theme('colors.github-border')}`,
          borderRadius: theme('borderRadius.github-md'),
          padding: '10px 12px',
          fontSize: theme('fontSize.github-sm'),
          transition: `all ${theme('transitionDuration.github-base')} ease`,
          '&::placeholder': {
            color: theme('colors.github-text-subtle'),
          },
          '&:hover': {
            borderColor: theme('colors.github-border-emphasis'),
          },
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.github-accent'),
            boxShadow: theme('boxShadow.github-focus'),
          },
        },

        '.alert-github-success': {
          backgroundColor: 'rgba(63, 185, 80, 0.05)',
          borderColor: '#238636',
          border: `1px solid #238636`,
          color: '#3fb950',
          borderRadius: theme('borderRadius.github-md'),
          padding: theme('spacing.github-md'),
        },

        '.alert-github-danger': {
          backgroundColor: 'rgba(248, 81, 73, 0.05)',
          borderColor: '#da3633',
          border: `1px solid #da3633`,
          color: '#f85149',
          borderRadius: theme('borderRadius.github-md'),
          padding: theme('spacing.github-md'),
        },

        '.alert-github-warning': {
          backgroundColor: 'rgba(210, 153, 34, 0.05)',
          borderColor: '#9e6a03',
          border: `1px solid #9e6a03`,
          color: '#d29922',
          borderRadius: theme('borderRadius.github-md'),
          padding: theme('spacing.github-md'),
        },

        '.link-github': {
          color: theme('colors.github-link'),
          textDecoration: 'none',
          cursor: 'pointer',
          transition: `color ${theme('transitionDuration.github-base')} ease`,
          '&:hover': {
            color: theme('colors.github-link-hover'),
            textDecoration: 'underline',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.github-accent')}`,
            outlineOffset: '2px',
            borderRadius: '2px',
          },
        },
      };

      addComponents(buttons);
    },
  ],

  // ===== TAILWIND CSS CLASSES SAFELIST =====
  // Diese Klassen werden NICHT gelöscht durch Tree-Shaking
  safelist: [
    // Button variants
    'btn-github-primary',
    'btn-github-secondary',
    'btn-github-danger',
    // Card
    'card-github',
    // Inputs
    'input-github',
    // Alerts
    'alert-github-success',
    'alert-github-danger',
    'alert-github-warning',
    // Links
    'link-github',
    // Text utilities
    {
      pattern: /text-github-(primary|secondary|success|danger|attention|link|muted)/,
    },
    // Background utilities
    {
      pattern: /bg-github-(primary|secondary|tertiary|hover|focus|success|danger)/,
    },
    // Border utilities
    {
      pattern: /border-github-(primary|secondary|success|danger|attention)/,
    },
  ],
};

/**
 * VERWENDUNGSBEISPIELE:
 *
 * HTML:
 * <div class="bg-github-primary text-github-text p-github-md rounded-github-md">
 *   <button class="btn-github-primary">Click me</button>
 * </div>
 *
 * React/JSX:
 * <div className="bg-github-primary text-github-text p-github-md rounded-github-md">
 *   <button className="btn-github-primary">Click me</button>
 * </div>
 *
 * CUSTOM UTILITIES:
 * - .btn-github-primary: Styled primary button
 * - .btn-github-secondary: Styled secondary button
 * - .btn-github-danger: Styled danger button
 * - .card-github: Styled card with hover effects
 * - .input-github: Styled form input
 * - .alert-github-success: Success alert
 * - .link-github: Styled link
 */
