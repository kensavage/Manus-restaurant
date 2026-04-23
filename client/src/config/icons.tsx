/**
 * Icon Resolver
 *
 * Maps string icon names from config to lucide-react components.
 * This avoids importing all icons in config files (which would be non-serializable).
 */

import {
  Bell,
  Users,
  Shield,
  BarChart3,
  TrendingUp,
  UserCheck,
  Calendar,
  CalendarCheck,
  CalendarX,
  MessageSquare,
  Zap,
  DollarSign,
  Share2,
  Mail,
  Palette,
  Star,
  Headphones,
  Scale,
  Clock,
  Phone,
  UtensilsCrossed,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bell,
  Users,
  Shield,
  BarChart3,
  TrendingUp,
  UserCheck,
  Calendar,
  CalendarCheck,
  CalendarX,
  MessageSquare,
  Zap,
  DollarSign,
  Share2,
  Mail,
  Palette,
  Star,
  Headphones,
  Scale,
  Clock,
  Phone,
  UtensilsCrossed,
  Megaphone,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Zap;
}
