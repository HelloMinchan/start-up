// Assets 정보를 관리하는 중간 계층

// 통합된 멤버 정보
export const MEMBERS = {
  minchan: {
    name: '민찬',
    role: '키보드 / 신디사이저',
    profile: new URL('./profile/minchan.png', import.meta.url).href,
    sound: new URL('./sound/minchan.m4a', import.meta.url).href,
    emoji: '🎹',
  },
  rokwon: {
    name: '록원',
    role: '기타',
    profile: new URL('./profile/rokwon.png', import.meta.url).href,
    sound: new URL('./sound/rokwon.m4a', import.meta.url).href,
    emoji: '🎸',
  },
  taejin: {
    name: '태진',
    role: '베이스',
    profile: new URL('./profile/taejin.png', import.meta.url).href,
    sound: new URL('./sound/taejin.mp3', import.meta.url).href,
    emoji: '🎸',
  },
  doyeon: {
    name: '도연',
    role: '드럼',
    profile: new URL('./profile/doyeon.png', import.meta.url).href,
    sound: null, // 도연은 아직 사운드가 없음
    emoji: '🥁',
  },
} as const

// 통합된 트랙 정보 (사운드 포함)
export const TRACKS = {
  track1: {
    title: 'Falling Slowly',
    description: '✅ 완곡, 25.01.12 ~ 25.06.29',
    youtubeId: 'SxE8f80DFpM',
    status: 'completed',
    practiceHistory: null,
  },
  track2: {
    title: '예뻤어',
    description: '✅ 완곡, 25.07.02 ~ 25.07.30',
    youtubeId: 'xejMrLT0Q7M?si=2kZJLgnLTTk3l8ag',
    status: 'completed',
    practiceHistory: [
      { week: 2, date: '25.07.09', sound: new URL('./sound/track2/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.07.16', sound: new URL('./sound/track2/week3.m4a', import.meta.url).href },
      { week: 4, date: '25.07.23', sound: new URL('./sound/track2/week4.m4a', import.meta.url).href },
      { week: 5, date: '25.07.30', sound: new URL('./sound/track2/week5.m4a', import.meta.url).href },
    ],
  },
  track3: {
    title: '박하사탕',
    description: '🔥 연습, 25.08.07 ~',
    youtubeId: 'fDQzDsAW434?si=plBauuN_dba4V8E1',
    status: 'practicing',
    practiceHistory: [
      { week: 1, date: '25.08.07', sound: new URL('./sound/track3/week1.m4a', import.meta.url).href },
      { week: 2, date: '25.08.20', sound: new URL('./sound/track3/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.08.28', sound: new URL('./sound/track3/week3.m4a', import.meta.url).href },
    ],
  },
} as const

// 로고 이미지
export const LOGO_IMAGES = {
  logo: new URL('./logo.png', import.meta.url).href,
  logoWhite: new URL('./logo-white.png', import.meta.url).href,
} as const

// 포스트잇 이미지
export const POSTIT_IMAGES = {
  postit: new URL('./postit.png', import.meta.url).href,
} as const

// 타입 정의
export type MemberKey = keyof typeof MEMBERS
export type TrackKey = keyof typeof TRACKS
