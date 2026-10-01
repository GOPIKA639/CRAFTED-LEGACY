import type { LucideIcon } from 'lucide-react';
import {
  ArrowUp,
  Award,
  BadgeCheck,
  BookOpen,
  Box,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Compass,
  Crown,
  Cpu,
  Database,
  Diamond,
  Facebook,
  Flame,
  Folder,
  Gem,
  Gift,
  Globe2,
  Heart,
  Home,
  Instagram,
  Landmark,
  Layers3,
  Leaf,
  Lightbulb,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Medal,
  Menu,
  Monitor,
  Package,
  Paintbrush,
  Palette,
  Phone,
  Puzzle,
  Rocket,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stamp,
  Star,
  Target,
  Trophy,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

export interface IconOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const iconOptions: IconOption[] = [
  { value: 'arrow-up', label: 'Arrow Up', icon: ArrowUp },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'badge-check', label: 'Badge Check', icon: BadgeCheck },
  { value: 'book-open', label: 'Book Open', icon: BookOpen },
  { value: 'box', label: 'Box', icon: Box },
  { value: 'briefcase-business', label: 'Briefcase', icon: BriefcaseBusiness },
  { value: 'building-2', label: 'Building', icon: Building2 },
  { value: 'calendar-days', label: 'Calendar', icon: CalendarDays },
  { value: 'check-circle-2', label: 'Check Circle', icon: CheckCircle2 },
  { value: 'chevron-down', label: 'Chevron Down', icon: ChevronDown },
  { value: 'chevron-up', label: 'Chevron Up', icon: ChevronUp },
  { value: 'clock', label: 'Clock', icon: Clock3 },
  { value: 'compass', label: 'Compass', icon: Compass },
  { value: 'crown', label: 'Crown', icon: Crown },
  { value: 'cpu', label: 'CPU', icon: Cpu },
  { value: 'database', label: 'Database', icon: Database },
  { value: 'diamond', label: 'Diamond', icon: Diamond },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'flame', label: 'Flame', icon: Flame },
  { value: 'folder', label: 'Folder', icon: Folder },
  { value: 'gem', label: 'Gem', icon: Gem },
  { value: 'gift', label: 'Gift', icon: Gift },
  { value: 'globe-2', label: 'Globe', icon: Globe2 },
  { value: 'heart', label: 'Heart', icon: Heart },
  { value: 'home', label: 'Home', icon: Home },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'landmark', label: 'Landmark', icon: Landmark },
  { value: 'layers-3', label: 'Layers', icon: Layers3 },
  { value: 'leaf', label: 'Leaf', icon: Leaf },
  { value: 'lightbulb', label: 'Lightbulb', icon: Lightbulb },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'lock', label: 'Lock', icon: Lock },
  { value: 'mail', label: 'Mail', icon: Mail },
  { value: 'map-pin', label: 'Map Pin', icon: MapPin },
  { value: 'medal', label: 'Medal', icon: Medal },
  { value: 'menu', label: 'Menu', icon: Menu },
  { value: 'monitor', label: 'Monitor', icon: Monitor },
  { value: 'package', label: 'Package', icon: Package },
  { value: 'paintbrush', label: 'Paintbrush', icon: Paintbrush },
  { value: 'palette', label: 'Palette', icon: Palette },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'puzzle', label: 'Puzzle', icon: Puzzle },
  { value: 'rocket', label: 'Rocket', icon: Rocket },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'shield-check', label: 'Shield Check', icon: ShieldCheck },
  { value: 'shopping-bag', label: 'Shopping Bag', icon: ShoppingBag },
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'stamp', label: 'Stamp', icon: Stamp },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'target', label: 'Target', icon: Target },
  { value: 'trophy', label: 'Trophy', icon: Trophy },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'wrench', label: 'Wrench', icon: Wrench },
  { value: 'x', label: 'Close', icon: X },
  { value: 'zap', label: 'Zap', icon: Zap },
];

const iconMap = Object.fromEntries(iconOptions.map((option) => [option.value, option.icon])) as Record<string, LucideIcon>;

export function getCustomizationFeatureIcon(title?: string, fallback = 'star'): string {
  const normalizedTitle = (title || '').toLowerCase();

  if (normalizedTitle.includes('emboss') || normalizedTitle.includes('deboss')) {
    return 'stamp';
  }
  if (normalizedTitle.includes('color')) {
    return 'palette';
  }
  if (normalizedTitle.includes('foil')) {
    return 'sparkles';
  }
  if (normalizedTitle.includes('packag')) {
    return 'package';
  }

  return fallback;
}

export function getIconComponent(iconName?: string, fallback?: LucideIcon): LucideIcon {
  return iconMap[iconName || ''] || fallback || ShieldCheck;
}
