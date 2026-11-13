import type {CSSProperties} from 'react';
import {
  LuArrowRight,
  LuBookOpen,
  LuCheck,
  LuDatabase,
  LuLayers,
  LuPanelsTopLeft,
  LuSearch,
  LuSparkles,
  LuStar,
  LuX,
} from 'react-icons/lu';

const icons = {
  arrow: LuArrowRight,
  data: LuDatabase,
  web: LuPanelsTopLeft,
  ai: LuSparkles,
  search: LuSearch,
  close: LuX,
  book: LuBookOpen,
  layers: LuLayers,
  check: LuCheck,
  star: LuStar,
};

export type IconName = keyof typeof icons;

export default function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const Component = icons[name];
  return (
    <Component
      size={size}
      strokeWidth={1.6}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    />
  );
}
