// src/utils/helper.ts

/**
 * Truncate text to a specified length and add "..." if it exceeds that length.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text.
 */
export const truncateDescription = (text: string, maxLength: number, dots: boolean = true): string => {
    if (text.length > maxLength) {
      return dots ? text.substring(0, maxLength) + '...' : text.substring(0, maxLength);
    }
    return text;
  };
  