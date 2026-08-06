import { UserStats } from '../types';

const STATS_KEY = 'presente_app_user_stats';

export const DEFAULT_STATS: UserStats = {
  cardsStudied: 0,
  quizzesTaken: 0,
  correctAnswers: 0,
  streakDays: 1,
  lastStudiedDate: new Date().toISOString().split('T')[0],
  masteredVerbs: [],
};

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastStudiedDate;
    
    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastDate === yesterdayStr) {
        parsed.streakDays += 1;
      } else {
        parsed.streakDays = 1; // streak reset if missed a day
      }
      parsed.lastStudiedDate = today;
      localStorage.setItem(STATS_KEY, JSON.stringify(parsed));
    }
    
    return parsed;
  } catch (e) {
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
}

export function recordCardStudied(): UserStats {
  const stats = getUserStats();
  stats.cardsStudied += 1;
  saveUserStats(stats);
  return stats;
}

export function recordQuizCompleted(correctCount: number): UserStats {
  const stats = getUserStats();
  stats.quizzesTaken += 1;
  stats.correctAnswers += correctCount;
  saveUserStats(stats);
  return stats;
}

export function markVerbMastered(verbId: string): UserStats {
  const stats = getUserStats();
  if (!stats.masteredVerbs.includes(verbId)) {
    stats.masteredVerbs.push(verbId);
    saveUserStats(stats);
  }
  return stats;
}
