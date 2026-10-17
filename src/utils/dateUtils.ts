import { Quote, WorldClockCity } from '../types';

export const TURKISH_DAYS = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi'
];

export const TURKISH_MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
];

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function getTimeGreeting(hour: number): { greeting: string; icon: string; message: string } {
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Günaydın',
      icon: '☀️',
      message: 'Zinde bir gün ve bol keyifli, hatasız kodlamalar dilerim!'
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      greeting: 'Tünaydın',
      icon: '⚡',
      message: 'Günün en verimli saatlerindeyiz. Odaklan ve harikalar yarat!'
    };
  } else if (hour >= 18 && hour < 23) {
    return {
      greeting: 'İyi Akşamlar',
      icon: '🌆',
      message: 'Günün yorgunluğunu JavaScript ile keyifli bir ödev yaparak atma vakti!'
    };
  } else {
    return {
      greeting: 'İyi Geceler',
      icon: '🌙',
      message: 'Gece kuşları için hata ayıklama (debug) ve kahve saati!'
    };
  }
}

export function formatTurkishDate(date: Date): string {
  const dayName = TURKISH_DAYS[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = TURKISH_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${dayNumber} ${monthName} ${year}, ${dayName}`;
}

export const WORLD_CITIES: WorldClockCity[] = [
  { id: 'istanbul', name: 'İstanbul', country: 'Türkiye (Yerel)', timeZone: 'Europe/Istanbul', flag: '🇹🇷' },
  { id: 'london', name: 'Londra', country: 'İngiltere (GMT/BST)', timeZone: 'Europe/London', flag: '🇬🇧' },
  { id: 'newyork', name: 'New York', country: 'ABD (EST/EDT)', timeZone: 'America/New_York', flag: '🇺🇸' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japonya (JST)', timeZone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'berlin', name: 'Berlin', country: 'Almanya (CET)', timeZone: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'dubai', name: 'Dubai', country: 'BAE (GST)', timeZone: 'Asia/Dubai', flag: '🇦🇪' },
];

export const DEVELOPER_QUOTES: Quote[] = [
  {
    quote: "Herkes kod yazmayı öğrenmeli; çünkü bu size nasıl düşüneceğinizi öğretir.",
    author: "Steve Jobs",
    role: "Apple Kurucusu"
  },
  {
    quote: "Konuşmak ucuzdur; bana kodu göster.",
    author: "Linus Torvalds",
    role: "Linux & Git Yaratıcısı"
  },
  {
    quote: "Hayatta en hakiki mürşit ilimdir, fendir.",
    author: "Mustafa Kemal Atatürk",
    role: "Türkiye Cumhuriyeti'nin Kurucusu"
  },
  {
    quote: "Önce problemi çözün. Sonra kodu yazın.",
    author: "John Johnson",
    role: "Yazılım Mimarı"
  },
  {
    quote: "Basitlik, güvenilirliğin ön koşuludur.",
    author: "Edsger W. Dijkstra",
    role: "Bilgisayar Bilimcisi"
  },
  {
    quote: "Kodunuzu, gelecekte ona bakacak kişinin nerede yaşadığınızı bilen şiddet yanlısı bir psikopat olacağını düşünerek yazın.",
    author: "John Woods",
    role: "Yazılım Mühendisi"
  },
  {
    quote: "Mükemmellik, eklenecek bir şey kalmadığında değil, çıkarılacak bir şey kalmadığında elde edilir.",
    author: "Antoine de Saint-Exupéry",
    role: "Yazar & Pilot"
  }
];
