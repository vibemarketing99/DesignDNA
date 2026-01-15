/**
 * DesignDNA - Design Token Extraction Script
 * Run via: agent-browser eval "$(cat tokens.js)"
 *
 * Extracts: colors, typography, spacing, shadows, border radii, CSS variables
 */

(function extractDesignTokens() {
  const tokens = {
    extractedAt: new Date().toISOString(),
    url: window.location.href,
    colors: {
      raw: [],
      semantic: {},
      cssVars: {}
    },
    typography: {
      fontFamilies: [],
      typeScale: [],
      fontWeights: new Set()
    },
    spacing: {
      values: [],
      scale: []
    },
    effects: {
      shadows: [],
      borderRadii: [],
      transitions: []
    }
  };

  // ===== COLOR EXTRACTION =====
  function extractColors() {
    const colors = new Set();
    const colorUsage = {};

    // Extract from computed styles
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const colorProps = [
        'color', 'backgroundColor', 'borderColor',
        'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
        'outlineColor', 'textDecorationColor', 'fill', 'stroke'
      ];

      colorProps.forEach(prop => {
        const value = style[prop];
        if (value &&
            value !== 'rgba(0, 0, 0, 0)' &&
            value !== 'transparent' &&
            value !== 'inherit' &&
            value !== 'currentcolor') {
          colors.add(value);
          colorUsage[value] = (colorUsage[value] || 0) + 1;
        }
      });
    });

    // Extract from stylesheets
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            const text = rule.cssText;

            // Hex colors
            const hexMatches = text.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
            hexMatches.forEach(c => colors.add(c));

            // RGB/RGBA
            const rgbMatches = text.match(/rgba?\([^)]+\)/g) || [];
            rgbMatches.forEach(c => colors.add(c));

            // HSL/HSLA
            const hslMatches = text.match(/hsla?\([^)]+\)/g) || [];
            hslMatches.forEach(c => colors.add(c));
          }
        } catch (e) {
          // CORS blocked stylesheet
        }
      }
    } catch (e) {}

    // Extract CSS custom properties (variables)
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    const cssVars = {};

    // Try to get all CSS variables from :root
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText === ':root' || rule.selectorText === 'html') {
              const text = rule.cssText;
              const varMatches = text.match(/--[\w-]+:\s*[^;]+/g) || [];
              varMatches.forEach(match => {
                const [name, ...valueParts] = match.split(':');
                const value = valueParts.join(':').trim();
                cssVars[name.trim()] = value;
              });
            }
          }
        } catch (e) {}
      }
    } catch (e) {}

    // Sort colors by usage frequency
    const sortedColors = [...colors].sort((a, b) =>
      (colorUsage[b] || 0) - (colorUsage[a] || 0)
    );

    tokens.colors.raw = sortedColors;
    tokens.colors.cssVars = cssVars;
    tokens.colors.usage = colorUsage;
  }

  // ===== TYPOGRAPHY EXTRACTION =====
  function extractTypography() {
    const fonts = new Set();
    const typeScaleMap = new Map();
    const fontWeights = new Set();

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const text = el.textContent?.trim();

      // Skip empty or non-text elements
      if (!text || text.length === 0) return;

      // Collect font families
      fonts.add(style.fontFamily);
      fontWeights.add(style.fontWeight);

      // Build type scale entry
      const key = `${style.fontSize}-${style.fontWeight}-${style.lineHeight}`;
      if (!typeScaleMap.has(key)) {
        typeScaleMap.set(key, {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          fontFamily: style.fontFamily,
          sampleTag: el.tagName.toLowerCase(),
          sampleText: text.slice(0, 50)
        });
      }
    });

    // Sort type scale by font size (largest first)
    const sortedTypeScale = [...typeScaleMap.values()].sort((a, b) =>
      parseFloat(b.fontSize) - parseFloat(a.fontSize)
    );

    tokens.typography.fontFamilies = [...fonts];
    tokens.typography.typeScale = sortedTypeScale;
    tokens.typography.fontWeights = [...fontWeights].sort((a, b) => parseInt(a) - parseInt(b));
  }

  // ===== SPACING EXTRACTION =====
  function extractSpacing() {
    const spacings = new Set();
    const spacingUsage = {};

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const spacingProps = [
        'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'gap', 'rowGap', 'columnGap'
      ];

      spacingProps.forEach(prop => {
        const value = style[prop];
        if (value && value !== '0px' && value !== 'auto' && value !== 'normal') {
          spacings.add(value);
          spacingUsage[value] = (spacingUsage[value] || 0) + 1;
        }
      });
    });

    // Sort by pixel value
    const sortedSpacings = [...spacings].sort((a, b) =>
      parseFloat(a) - parseFloat(b)
    );

    // Create spacing scale (dedupe similar values)
    const spacingScale = [];
    let lastValue = 0;
    sortedSpacings.forEach(spacing => {
      const pxValue = parseFloat(spacing);
      if (pxValue > lastValue + 1) { // Allow 1px tolerance
        spacingScale.push({
          value: spacing,
          px: pxValue,
          usage: spacingUsage[spacing] || 0
        });
        lastValue = pxValue;
      }
    });

    tokens.spacing.values = sortedSpacings;
    tokens.spacing.scale = spacingScale;
  }

  // ===== EFFECTS EXTRACTION =====
  function extractEffects() {
    const shadows = new Set();
    const radii = new Set();
    const transitions = new Set();

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);

      // Box shadows
      if (style.boxShadow !== 'none') {
        shadows.add(style.boxShadow);
      }

      // Border radii
      if (style.borderRadius !== '0px') {
        radii.add(style.borderRadius);
      }

      // Transitions
      if (style.transition !== 'all 0s ease 0s' && style.transition !== 'none') {
        transitions.add(style.transition);
      }
    });

    // Sort radii by size
    const sortedRadii = [...radii].sort((a, b) =>
      parseFloat(a) - parseFloat(b)
    );

    tokens.effects.shadows = [...shadows];
    tokens.effects.borderRadii = sortedRadii;
    tokens.effects.transitions = [...transitions];
  }

  // ===== STATISTICS =====
  function calculateStats() {
    tokens.stats = {
      totalColors: tokens.colors.raw.length,
      totalCssVars: Object.keys(tokens.colors.cssVars).length,
      totalFonts: tokens.typography.fontFamilies.length,
      totalTypeScale: tokens.typography.typeScale.length,
      totalSpacingValues: tokens.spacing.values.length,
      totalShadows: tokens.effects.shadows.length,
      totalRadii: tokens.effects.borderRadii.length
    };
  }

  // Run all extractions
  extractColors();
  extractTypography();
  extractSpacing();
  extractEffects();
  calculateStats();

  return tokens;
})();
