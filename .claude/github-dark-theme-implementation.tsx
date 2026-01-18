/**
 * GitHub Dark-Theme Implementation Template
 *
 * Diese Datei enthält praktische Code-Beispiele zur Implementierung
 * von Githubs Dark-Mode Farbpalette in React-Projekten.
 *
 * Anwendung:
 * 1. Kopiere die Theme-Definitionen in dein Projekt
 * 2. Nutze die TypeScript-Interfaces für Type-Safety
 * 3. Integriere ThemeProvider in deine Root-Komponente
 * 4. Verwende useTheme Hook und StyledComponents
 */

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import styled, { ThemeProvider as StyledThemeProvider, css } from 'styled-components';

// ============================================================================
// 1. THEME DEFINITIONEN
// ============================================================================

/**
 * GitHub Dark-Mode Farbpalette als TypeScript Theme-Objekt
 */
export const githubDarkTheme = {
  // === BACKGROUNDS ===
  colors: {
    background: {
      primary: '#0d1117',
      secondary: '#161b22',
      tertiary: '#21262d',
      hover: '#30363d',
      focus: '#3d444d',
      canvas: '#0d1117',
      overlay: '#010409',
    },

    // === FOREGROUNDS/TEXT ===
    foreground: {
      default: '#c9d1d9',
      muted: '#8b949e',
      subtle: '#6e7681',
      onPrimary: '#ffffff',
      disabled: '#6e7681',
    },

    // === ACCENTS ===
    accent: {
      primary: '#58a6ff',
      secondary: '#388bfd',
      emphasis: '#1f6feb',
      muted: '#388bfd',
      subtle: 'rgba(88, 166, 255, 0.1)',
    },

    // === FUNCTIONAL COLORS ===
    success: {
      foreground: '#3fb950',
      emphasis: '#238636',
      muted: '#26843b',
      subtle: 'rgba(63, 185, 80, 0.1)',
      border: '#238636',
    },

    danger: {
      foreground: '#f85149',
      emphasis: '#da3633',
      muted: '#da3633',
      subtle: 'rgba(248, 81, 73, 0.1)',
      border: '#da3633',
    },

    attention: {
      foreground: '#d29922',
      emphasis: '#9e6a03',
      muted: '#9e6a03',
      subtle: 'rgba(210, 153, 34, 0.1)',
      border: '#9e6a03',
    },

    done: {
      foreground: '#bc8ef7',
      emphasis: '#8957e5',
      muted: '#6e40c9',
      subtle: 'rgba(188, 142, 247, 0.1)',
    },

    // === BORDERS ===
    border: {
      default: '#30363d',
      muted: '#21262d',
      subtle: '#161b22',
      emphasis: '#444c56',
      success: '#238636',
      danger: '#da3633',
      warning: '#9e6a03',
    },

    // === LINKS ===
    link: {
      primary: '#58a6ff',
      hover: '#79c0ff',
      active: '#1f6feb',
      visited: '#bc8ef7',
      secondary: '#8b949e',
      muted: '#6e7681',
    },
  },

  // === SHADOWS ===
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
    sm: '0 4px 8px rgba(0, 0, 0, 0.3)',
    md: '0 8px 16px rgba(0, 0, 0, 0.4)',
    lg: '0 16px 32px rgba(0, 0, 0, 0.5)',
    inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  },

  // === SPACING ===
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // === BORDER RADIUS ===
  borderRadius: {
    small: '4px',
    medium: '6px',
    large: '8px',
    full: '50%',
  },

  // === TRANSITIONS ===
  transitions: {
    fast: '0.15s ease',
    base: '0.2s ease',
    slow: '0.3s ease',
  },

  // === BREAKPOINTS ===
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

// ============================================================================
// 2. THEME CONTEXT & PROVIDER
// ============================================================================

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return true;

    // 1. Check localStorage
    const stored = localStorage.getItem('github-theme-mode');
    if (stored !== null) return stored === 'dark';

    // 2. Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => setTheme(!isDarkMode);

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('github-theme-mode', isDark ? 'dark' : 'light');

    // Update HTML attribute for CSS
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark-mode', isDark);
    }
  };

  // Listen to system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const stored = localStorage.getItem('github-theme-mode');
      if (stored === null) {
        setIsDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
      <StyledThemeProvider theme={githubDarkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// ============================================================================
// 3. STYLED COMPONENTS
// ============================================================================

/**
 * Base Container mit primärem Background
 */
export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.foreground.default};
  min-height: 100vh;
  transition: background-color ${(props) => props.theme.transitions.base};
`;

/**
 * Card Component
 */
export const Card = styled.div<{ elevation?: 'sm' | 'md' | 'lg' }>`
  background-color: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.default};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.md};
  box-shadow: ${(props) => {
    const elevation = props.elevation || 'sm';
    return props.theme.shadows[elevation];
  }};
  transition: all ${(props) => props.theme.transitions.base};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.secondary};
    border-color: ${(props) => props.theme.colors.border.emphasis};
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

/**
 * Button Primary
 */
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  ${(props) => {
    const variantStyles = {
      primary: css`
        background-color: ${props.theme.colors.success.emphasis};
        color: #ffffff;
        border: 1px solid ${props.theme.colors.border.default};

        &:hover {
          background-color: #2ea043;
          box-shadow: ${props.theme.shadows.sm};
        }

        &:active {
          background-color: ${props.theme.colors.success.emphasis};
          box-shadow: ${props.theme.shadows.inset};
        }
      `,
      secondary: css`
        background-color: ${props.theme.colors.background.secondary};
        color: ${props.theme.colors.foreground.default};
        border: 1px solid ${props.theme.colors.border.default};

        &:hover {
          background-color: ${props.theme.colors.background.hover};
          border-color: ${props.theme.colors.border.emphasis};
        }
      `,
      danger: css`
        background-color: transparent;
        color: ${props.theme.colors.danger.foreground};
        border: 1px solid rgba(248, 81, 73, 0.4);

        &:hover {
          background-color: rgba(248, 81, 73, 0.1);
          border-color: ${props.theme.colors.danger.emphasis};
        }
      `,
      success: css`
        background-color: ${props.theme.colors.success.emphasis};
        color: #ffffff;
        border: 1px solid ${props.theme.colors.success.border};

        &:hover {
          background-color: #2ea043;
        }
      `,
    };

    return variantStyles[props.variant || 'primary'];
  }};

  ${(props) => {
    const sizeStyles = {
      small: css`
        padding: 6px 12px;
        font-size: 12px;
      `,
      medium: css`
        padding: 8px 16px;
        font-size: 14px;
      `,
      large: css`
        padding: 12px 20px;
        font-size: 16px;
      `,
    };

    return sizeStyles[props.size || 'medium'];
  }};

  font-weight: 500;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.base};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accent.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * Input Component
 */
export const Input = styled.input<{ isError?: boolean; isSuccess?: boolean }>`
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.foreground.default};
  border: 1px solid;
  border-color: ${(props) => {
    if (props.isError) return props.theme.colors.danger.border;
    if (props.isSuccess) return props.theme.colors.success.border;
    return props.theme.colors.border.default;
  }};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: 10px 12px;
  font-size: 14px;
  transition: all ${(props) => props.theme.transitions.base};

  &::placeholder {
    color: ${(props) => props.theme.colors.foreground.subtle};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.border.emphasis};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => {
      if (props.isError) return props.theme.colors.danger.foreground;
      if (props.isSuccess) return props.theme.colors.success.foreground;
      return props.theme.colors.accent.primary;
    }};
    box-shadow: 0 0 0 3px ${(props) => {
      if (props.isError) return 'rgba(248, 81, 73, 0.2)';
      if (props.isSuccess) return 'rgba(63, 185, 80, 0.2)';
      return props.theme.colors.accent.subtle;
    }};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.background.secondary};
    color: ${(props) => props.theme.colors.foreground.muted};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

/**
 * Link Component
 */
export const Link = styled.a<{ variant?: 'primary' | 'secondary' | 'muted' }>`
  color: ${(props) => {
    const variants = {
      primary: props.theme.colors.link.primary,
      secondary: props.theme.colors.link.secondary,
      muted: props.theme.colors.link.muted,
    };
    return variants[props.variant || 'primary'];
  }};
  text-decoration: none;
  cursor: pointer;
  transition: color ${(props) => props.theme.transitions.base};

  &:hover {
    text-decoration: underline;
    color: ${(props) => {
      if (props.variant === 'muted') return props.theme.colors.link.secondary;
      if (props.variant === 'secondary') return props.theme.colors.foreground.default;
      return props.theme.colors.link.hover;
    }};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accent.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

/**
 * Alert Component
 */
export const Alert = styled.div<{
  type?: 'info' | 'success' | 'warning' | 'danger';
}>`
  border: 1px solid;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};

  ${(props) => {
    const typeStyles = {
      info: css`
        background-color: rgba(79, 195, 247, 0.05);
        border-color: #0f88d9;
        color: #79c0ff;
      `,
      success: css`
        background-color: rgba(63, 185, 80, 0.05);
        border-color: ${props.theme.colors.success.border};
        color: ${props.theme.colors.success.foreground};
      `,
      warning: css`
        background-color: rgba(210, 153, 34, 0.05);
        border-color: ${props.theme.colors.attention.border};
        color: ${props.theme.colors.attention.foreground};
      `,
      danger: css`
        background-color: rgba(248, 81, 73, 0.05);
        border-color: ${props.theme.colors.danger.border};
        color: ${props.theme.colors.danger.foreground};
      `,
    };

    return typeStyles[props.type || 'info'];
  }};
`;

/**
 * Badge Component
 */
export const Badge = styled.span<{ variant?: 'primary' | 'success' | 'danger' | 'warning' }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    const variants = {
      primary: props.theme.colors.accent.subtle,
      success: props.theme.colors.success.subtle,
      danger: props.theme.colors.danger.subtle,
      warning: props.theme.colors.attention.subtle,
    };
    return variants[props.variant || 'primary'];
  }};
  color: ${(props) => {
    const variants = {
      primary: props.theme.colors.accent.primary,
      success: props.theme.colors.success.foreground,
      danger: props.theme.colors.danger.foreground,
      warning: props.theme.colors.attention.foreground,
    };
    return variants[props.variant || 'primary'];
  }};
`;

/**
 * Heading Component
 */
export const Heading = styled.h1<{ level?: 1 | 2 | 3 | 4 | 5 | 6 }>`
  color: ${(props) => props.theme.colors.foreground.default};
  margin: 0;
  font-weight: 600;

  ${(props) => {
    const levelStyles = {
      1: css`font-size: 32px; line-height: 1.25; margin-bottom: 24px;`,
      2: css`font-size: 24px; line-height: 1.35; margin-bottom: 16px;`,
      3: css`font-size: 20px; line-height: 1.4; margin-bottom: 16px;`,
      4: css`font-size: 16px; line-height: 1.5; margin-bottom: 12px;`,
      5: css`font-size: 14px; line-height: 1.5; margin-bottom: 12px;`,
      6: css`font-size: 12px; line-height: 1.5; margin-bottom: 8px;`,
    };
    return levelStyles[props.level || 1];
  }};
`;

/**
 * Text Component
 */
export const Text = styled.p<{ variant?: 'default' | 'muted' | 'subtle' }>`
  color: ${(props) => {
    const variants = {
      default: props.theme.colors.foreground.default,
      muted: props.theme.colors.foreground.muted,
      subtle: props.theme.colors.foreground.subtle,
    };
    return variants[props.variant || 'default'];
  }};
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

// ============================================================================
// 4. BEISPIEL-KOMPONENTEN
// ============================================================================

/**
 * Theme Toggle Button Component
 */
export const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" onClick={toggleTheme} title="Toggle theme">
      {isDarkMode ? '☀️ Light' : '🌙 Dark'}
    </Button>
  );
};

/**
 * Header Navigation Component
 */
export const HeaderNav = styled.nav`
  background-color: ${(props) => props.theme.colors.background.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.default};
  padding: ${(props) => props.theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  sticky: top;
  top: 0;
  z-index: 100;
`;

const NavItem = styled(Link)`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.small};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.secondary};
  }

  &.active {
    color: ${(props) => props.theme.colors.accent.primary};
    border-bottom: 2px solid ${(props) => props.theme.colors.accent.primary};
  }
`;

/**
 * Demo Component
 */
export const DemoContainer: React.FC = () => {
  return (
    <Container>
      <Card style={{ margin: '24px', maxWidth: '600px' }}>
        <Heading level={2}>GitHub Dark-Theme Demo</Heading>
        <Text variant="muted">
          Dies ist eine Implementierung der GitHub Dark-Mode Farbpalette in React.
        </Text>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <Alert type="success" style={{ marginTop: '16px' }}>
          ✓ Dark-Mode ist aktiviert
        </Alert>

        <div style={{ marginTop: '16px' }}>
          <Input placeholder="Gib etwas ein..." />
        </div>
      </Card>
    </Container>
  );
};

// ============================================================================
// 5. CSS GLOBAL STYLES
// ============================================================================

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.foreground.default};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${(props) => props.theme.transitions.base};
  }

  /* Selection Styling */
  ::selection {
    background-color: ${(props) => props.theme.colors.accent.primary};
    color: ${(props) => props.theme.colors.background.primary};
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.background.primary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.border.default};
    border-radius: 6px;

    &:hover {
      background-color: ${(props) => props.theme.colors.border.emphasis};
    }
  }

  /* Code Block Styling */
  code,
  pre {
    background-color: ${(props) => props.theme.colors.background.secondary};
    color: ${(props) => props.theme.colors.foreground.default};
    border-radius: ${(props) => props.theme.borderRadius.small};
  }

  code {
    padding: 2px 6px;
  }

  pre {
    padding: 12px;
    overflow-x: auto;
  }
`;

export default githubDarkTheme;
