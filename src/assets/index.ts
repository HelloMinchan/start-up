// Assets 정보를 관리하는 중간 계층

// 포스트잇 이미지
export const POSTIT_IMAGES = {
  postit: new URL('./postit.png', import.meta.url).href,
} as const

// 멤버 정보
export const MEMBERS = {
  minchan: {
    name: '민찬',
    role: '건반 / 신디사이저',
    profile: new URL('./profile/minchan.png', import.meta.url).href,
    sound: new URL('./sound/minchan.m4a', import.meta.url).href,
    emoji: '🎹',
    color: {
      primary: 'rgba(240, 147, 251, 0.15)',
      secondary: 'rgba(245, 87, 108, 0.15)',
      mobile: {
        primary: 'rgba(240, 147, 251, 0.2)',
        secondary: 'rgba(245, 87, 108, 0.2)',
      },
    },
  },
  rokwon: {
    name: '록원',
    role: '기타',
    profile: new URL('./profile/rokwon.png', import.meta.url).href,
    sound: new URL('./sound/rokwon.m4a', import.meta.url).href,
    emoji: '🎸',
    color: {
      primary: 'rgba(102, 126, 234, 0.15)',
      secondary: 'rgba(118, 75, 162, 0.15)',
      mobile: {
        primary: 'rgba(102, 126, 234, 0.2)',
        secondary: 'rgba(118, 75, 162, 0.2)',
      },
    },
  },
  taejin: {
    name: '태진',
    role: '베이스',
    profile: new URL('./profile/taejin.png', import.meta.url).href,
    sound: new URL('./sound/taejin.mp3', import.meta.url).href,
    emoji: '🎸',
    color: {
      primary: 'rgba(79, 172, 254, 0.15)',
      secondary: 'rgba(0, 242, 254, 0.15)',
      mobile: {
        primary: 'rgba(79, 172, 254, 0.2)',
        secondary: 'rgba(0, 242, 254, 0.2)',
      },
    },
  },
  doyeon: {
    name: '도연',
    role: '드럼',
    profile: new URL('./profile/doyeon.png', import.meta.url).href,
    sound: null,
    emoji: '🥁',
    color: {
      primary: 'rgba(67, 233, 123, 0.15)',
      secondary: 'rgba(56, 249, 215, 0.15)',
      mobile: {
        primary: 'rgba(67, 233, 123, 0.2)',
        secondary: 'rgba(56, 249, 215, 0.2)',
      },
    },
  },
  jihye: {
    name: '지혜',
    role: '보컬',
    profile: new URL('./profile/jihye.png', import.meta.url).href,
    sound: new URL('./sound/jihye.m4a', import.meta.url).href,
    emoji: '🎤',
    color: {
      primary: 'rgba(228, 248, 101, 0.15)',
      secondary: 'rgba(228, 248, 101, 0.15)',
      mobile: {
        primary: 'rgba(228, 248, 101, 0.15)',
        secondary: 'rgba(228, 248, 101, 0.15)',
      },
    },
  },
  jihyeok: {
    name: '지혁',
    role: '기타',
    profile: new URL('./profile/jihyeok.png', import.meta.url).href,
    sound: null,
    emoji: '🎸',
    color: {
      primary: 'rgba(248, 173, 82, 0.15)',
      secondary: 'rgba(248, 173, 82, 0.15)',
      mobile: {
        primary: 'rgba(248, 173, 82, 0.15)',
        secondary: 'rgba(248, 173, 82, 0.15)',
      },
    },
  },
} as const

// 통합된 트랙 정보 (사운드 포함)
export const TRACKS = {
  track1: {
    title: 'Falling Slowly',
    description: '25.01.12 ~ 25.06.29',
    youtubeId: 'SxE8f80DFpM',
    status: 'completed',
    practiceHistory: null,
  },
  track2: {
    title: '예뻤어',
    description: '25.07.02 ~ 25.07.30',
    youtubeId: 'xejMrLT0Q7M?si=2kZJLgnLTTk3l8ag',
    status: 'completed',
    practiceHistory: [
      { week: 2, date: '25.07.09', sound: new URL('./sound/track2/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.07.16', sound: new URL('./sound/track2/week3.m4a', import.meta.url).href },
      { week: 4, date: '25.07.23', sound: new URL('./sound/track2/week4.m4a', import.meta.url).href },
      { week: 5, date: '25.07.30', sound: new URL('./sound/track2/week5.m4a', import.meta.url).href },
      // { week: 6, date: '25.08.01', sound: new URL('./sound/track2/week5.m4a', import.meta.url).href },
      // { week: 7, date: '25.08.10', sound: new URL('./sound/track2/week5.m4a', import.meta.url).href },
      // { week: 8, date: '25.08.17', sound: new URL('./sound/track2/week5.m4a', import.meta.url).href },
    ],
  },
  track3: {
    title: '박하사탕',
    description: '25.08.07 ~ 25.09.04',
    youtubeId: '60uKfc_YIOE?si=Qm2jFgWn2LRzwkRU',
    status: 'completed',
    practiceHistory: [
      { week: 1, date: '25.08.07', sound: new URL('./sound/track3/week1.m4a', import.meta.url).href },
      { week: 2, date: '25.08.20', sound: new URL('./sound/track3/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.08.28', sound: new URL('./sound/track3/week3.m4a', import.meta.url).href },
      { week: 4, date: '25.09.04', sound: new URL('./sound/track3/week4.m4a', import.meta.url).href },
    ],
  },
  track4: {
    title: '밤이 깊었네 (Drama Ver.)',
    description: '25.09.16 ~ 25.10.23',
    youtubeId: 'Y39aDxwpt6o?si=ZibT-v9SfpyLKpQ6',
    status: 'completed',
    practiceHistory: [
      { week: 2, date: '25.09.25', sound: new URL('./sound/track4/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.10.16', sound: new URL('./sound/track4/week3.m4a', import.meta.url).href },
      { week: 4, date: '25.10.23', sound: new URL('./sound/track4/week4.m4a', import.meta.url).href },
    ],
  },
  track5: {
    title: '안녕 (Hello)',
    description: '25.11.30 ~',
    youtubeId: 'UUqQvu3z5ZI?si=1AloOZtac0f63Wow',
    status: 'practicing',
    practiceHistory: [
      { week: 1, date: '25.10.30', sound: new URL('./sound/track5/week1.m4a', import.meta.url).href },
      { week: 2, date: '25.11.13', sound: new URL('./sound/track5/week2.m4a', import.meta.url).href },
      { week: 3, date: '25.11.20', sound: new URL('./sound/track5/week3.m4a', import.meta.url).href },
    ],
  },
} as const

// 로고 이미지
export const LOGO_IMAGES = {
  logo: new URL('./logo.png', import.meta.url).href,
  logoWhite: new URL('./logo-white.png', import.meta.url).href,
} as const

// 타입 정의
export type MemberKey = keyof typeof MEMBERS
export type TrackKey = keyof typeof TRACKS
