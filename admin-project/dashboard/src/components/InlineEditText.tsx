import React, { useRef, useCallback, useEffect } from 'react';

interface InlineEditTextProps {
  value: string;
  onChange: (value: string) => void;
  tagName?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export default function InlineEditText({
  value,
  onChange,
  tagName = 'span',
  className = '',
  style = {},
  disabled = false,
}: InlineEditTextProps) {
  const ref = useRef<HTMLElement>(null);
  const focused = useRef(false);

  useEffect(() => {
    if (ref.current && !focused.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  const handleFocus = useCallback(() => { focused.current = true; }, []);
  const handleBlur = useCallback(() => {
    focused.current = false;
    if (ref.current) onChange(ref.current.textContent || '');
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (ref.current) onChange(ref.current.textContent || '');
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLElement).blur(); }
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
  }, []);

  const Tag = tagName as any;

  return (
    <Tag
      ref={ref}
      contentEditable={!disabled}
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className={`outline-none focus:ring-2 focus:ring-[#6f0000]/30 focus:ring-offset-1 rounded cursor-text ${disabled ? 'cursor-default' : ''} ${className}`}
      style={{ ...style, minWidth: '1em', whiteSpace: 'pre-wrap' }}
    />
  );
}
