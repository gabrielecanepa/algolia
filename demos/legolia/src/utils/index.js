import { singular } from 'pluralize'

/**
 * Convert a theme object to a string containing the correspondent CSS variables.
 * Doesn't work with nested objects.
 */
export const themeToCss = theme =>
  Object.keys(theme)
    .reduce(
      (vars, key) =>
        typeof theme[key] === 'object'
          ? [
              ...vars,
              ...Object.keys(theme[key]).map(
                value => `--${singular(key)}-${value}: ${theme[key][value]};`
              ),
            ]
          : [...vars, `--${key}: ${theme[key]};`],
      []
    )
    .join('\n')
