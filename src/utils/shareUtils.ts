export const canShareContent = () => {
  return typeof navigator !== 'undefined' && 
         navigator.share && 
         navigator.canShare;
};

export const shareContent = async (content: { title?: string; text?: string; url?: string }) => {
  try {
    if (!canShareContent()) {
      throw new Error('Web Share API not supported');
    }

    if (!navigator.canShare(content)) {
      throw new Error('Content cannot be shared');
    }

    await navigator.share(content);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('Share failed:', error.message);
    }
    return false;
  }
};