import { ImageOff } from 'lucide-react';

export default function ImagePlaceholder({ label = 'Image', aspectRatio = '16/9', icon: Icon = ImageOff, className = '', style = {} }) {
  return (
    <div
      className={`img-placeholder ${className}`}
      style={{ aspectRatio, ...style }}
      role="img"
      aria-label={`Placeholder for: ${label}`}
    >
      <Icon size={32} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
