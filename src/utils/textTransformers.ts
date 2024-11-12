// Character maps and patterns
const asciiPatterns: { [key: string]: string[] } = {
  'A': [' ████ ', '█    █', '█    █', '██████', '█    █'],
  'B': ['██████', '█    █', '██████', '█    █', '██████'],
  'C': [' ████ ', '█    █', '█     ', '█    █', ' ████ '],
  'D': ['██████', '█    █', '█    █', '█    █', '██████'],
  'E': ['██████', '█     ', '██████', '█     ', '██████'],
  'F': ['██████', '█     ', '██████', '█     ', '█     '],
  'G': [' ████ ', '█     ', '█  ███', '█    █', ' ████ '],
  'H': ['█    █', '█    █', '██████', '█    █', '█    █'],
  'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '██████'],
  'J': ['██████', '   █  ', '   █  ', '█  █  ', ' ██   '],
  'K': ['█   █ ', '█  █  ', '███   ', '█  █  ', '█   █ '],
  'L': ['█     ', '█     ', '█     ', '█     ', '██████'],
  'M': ['█    █', '██  ██', '█ ██ █', '█    █', '█    █'],
  'N': ['█    █', '██   █', '█ █  █', '█  █ █', '█   ██'],
  'O': [' ████ ', '█    █', '█    █', '█    █', ' ████ '],
  'P': ['██████', '█    █', '██████', '█     ', '█     '],
  'Q': [' ████ ', '█    █', '█    █', '█  █ █', ' ████ '],
  'R': ['██████', '█    █', '██████', '█  █  ', '█   █ '],
  'S': [' ████ ', '█     ', ' ████ ', '     █', '████  '],
  'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
  'U': ['█    █', '█    █', '█    █', '█    █', ' ████ '],
  'V': ['█    █', '█    █', '█    █', ' █  █ ', '  ██  '],
  'W': ['█    █', '█    █', '█ ██ █', '██  ██', '█    █'],
  'X': ['█    █', ' █  █ ', '  ██  ', ' █  █ ', '█    █'],
  'Y': ['█    █', ' █  █ ', '  ██  ', '  ██  ', '  ██  '],
  'Z': ['██████', '    █ ', '  █   ', ' █    ', '██████']
};

// Mirror text mapping
const mirrorMap: { [key: string]: string } = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ',
  'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
  'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o',
  'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
  'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ',
  'z': 'z', 'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D',
  'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I',
  'J': 'ſ', 'K': 'K', 'L': '˥', 'M': 'W', 'N': 'N',
  'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'R', 'S': 'S',
  'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z', '0': '0', '1': 'Ɩ', '2': 'ᄅ',
  '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '.': '˙', ',': '\'', '\'': ',',
  '"': '„', '`': ',', '?': '¿', '!': '¡', '[': ']',
  ']': '[', '(': ')', ')': '(', '{': '}', '}': '{',
  '<': '>', '>': '<', '&': '⅋', '_': '‾'
};

// Small caps mapping
const smallCapsMap: { [key: string]: string } = {
  'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ',
  'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
  'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ',
  'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
  'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ',
  'z': 'ᴢ'
};

// Bubble text mapping
const bubbleMap: { [key: string]: string } = {
  'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ',
  'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ',
  'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ',
  'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ',
  'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ',
  'z': 'ⓩ', 'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ',
  'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ',
  'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ',
  'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ',
  'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ',
  'Y': 'Ⓨ', 'Z': 'Ⓩ', '0': '⓪', '1': '①', '2': '②',
  '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦',
  '8': '⑧', '9': '⑨'
};

// Circle text mapping (filled variant)
const circleFilledMap: { [key: string]: string } = {
  'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔',
  'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙',
  'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞',
  'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣',
  'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨',
  'z': '🅩', 'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓',
  'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘',
  'J': '🅙', 'K': '🅚', 'L': '🅛', 'M': '🅜', 'N': '🅝',
  'O': '🅞', 'P': '🅟', 'Q': '🅠', 'R': '🅡', 'S': '🅢',
  'T': '🅣', 'U': '🅤', 'V': '🅥', 'W': '🅦', 'X': '🅧',
  'Y': '🅨', 'Z': '🅩'
};

// Glitch character sets
const glitchChars = ['̸', '̷', '̶', '̵', '̴', '̳', '̲', '̱', '̰', '̯', '̮', '̭', '̬', '̫', '̪', '̩', '̨', '̧', '̦', '̥'];
const zalgoMarks = {
  above: ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌'],
  middle: ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷'],
  below: ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰']
};

export const toBigText = (text: string, size: 'medium' | 'big' = 'big'): string => {
  const lines: string[] = ['', '', '', '', ''];
  const chars = text.toUpperCase().split('');
  
  chars.forEach(char => {
    const pattern = asciiPatterns[char] || Array(5).fill('      ');
    pattern.forEach((line, i) => {
      lines[i] += line + (size === 'big' ? '  ' : ' ');
    });
  });
  
  return lines.join('\n');
};

export const toAsciiArt = (text: string): string[] => {
  const result: string[] = [];
  const chars = text.toUpperCase().split('');
  
  chars.forEach(char => {
    const pattern = asciiPatterns[char] || Array(5).fill('      ');
    pattern.forEach((line, i) => {
      if (!result[i]) result[i] = '';
      result[i] += line;
    });
  });
  
  return result;
};

export const mirrorText = (text: string): string => {
  return text
    .split('')
    .map(char => mirrorMap[char] || char)
    .reverse()
    .join('');
};

export const toSmallCaps = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map(char => smallCapsMap[char] || char)
    .join('');
};

export const toBubbleText = (text: string): string => {
  return text
    .split('')
    .map(char => bubbleMap[char] || char)
    .join('');
};

export const toCircleText = (text: string, style: 'outlined' | 'filled' = 'outlined'): string => {
  const map = style === 'outlined' ? bubbleMap : circleFilledMap;
  return text
    .split('')
    .map(char => map[char] || char)
    .join('');
};

export const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

export const invertText = (text: string): string => {
  return mirrorText(text);
};

export const toGlitchText = (text: string, intensity: number = 2): string => {
  if (!text) return '';

  const addGlitchEffect = (char: string): string => {
    let glitched = char;
    
    for (let i = 0; i < intensity; i++) {
      if (Math.random() < 0.5) {
        glitched += zalgoMarks.above[Math.floor(Math.random() * zalgoMarks.above.length)];
      }
      if (Math.random() < 0.3) {
        glitched += zalgoMarks.middle[Math.floor(Math.random() * zalgoMarks.middle.length)];
      }
      if (Math.random() < 0.4) {
        glitched += zalgoMarks.below[Math.floor(Math.random() * zalgoMarks.below.length)];
      }
      if (Math.random() < 0.3) {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
    }

    if (Math.random() < 0.1 * intensity) {
      glitched = glitched.repeat(Math.floor(Math.random() * 2) + 1);
    }

    return glitched;
  };

  return text.split('').map(addGlitchEffect).join('');
};