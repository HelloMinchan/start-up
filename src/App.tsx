import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Typewriter from 'typewriter-effect'
import {
  LOGO_IMAGES,
  POSTIT_IMAGES,
  MEMBERS,
  TRACKS,
} from './assets'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import Background from './components/Background'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisible3, setIsVisible3] = useState(false)
  const [playingMember, setPlayingMember] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState<number>(0)
  
  // 배경 파장 애니메이션을 위한 ref
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const timer2 = setTimeout(() => {
      setIsVisible2(true)
    }, 5000)

    const timer3 = setTimeout(() => {
      setIsVisible3(true)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const playSound = (audioFile: string, memberName: string) => {
    if (playingMember === memberName) {
      currentAudio?.pause()
      currentAudio?.removeEventListener('ended', () => {})
      setCurrentAudio(null)
      setPlayingMember(null)
      return
    }

    if (currentAudio) {
      currentAudio.pause()
      currentAudio.removeEventListener('ended', () => {})
    }

    const audio = new Audio(audioFile)
    audio.play()
    audio.addEventListener('ended', () => {
      setPlayingMember(null)
      setCurrentAudio(null)
    })
    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime
      const duration = audio.duration
      if (duration > 0) {
        setProgress((currentTime / duration) * 100)
      }
    })

    setCurrentAudio(audio)
    setPlayingMember(memberName)
  }

  return (
    <Container>
      <Background 
        currentMember={playingMember ? Object.keys(MEMBERS).find(key => MEMBERS[key as keyof typeof MEMBERS].name === playingMember) : null}
      />
      <Layout>
        <Head>
          <Logo src={LOGO_IMAGES.logoWhite} />
        </Head>

        <Description>
          <Typewriter
            options={{
              strings: '안녕하세요 :D',
              autoStart: true,
            }}
          />

          {isVisible ? (
            <Typewriter
              options={{
                strings: '꿈과 현실 사이 치열하게 고민하고',
                autoStart: true,
              }}
            />
          ) : (
            <div style={{ visibility: 'hidden' }}>-</div>
          )}

          {isVisible2 ? (
            <Typewriter
              options={{
                strings: '음악으로 뜨겁게 열정을 불태우는',
                autoStart: true,
              }}
            />
          ) : (
            <div style={{ visibility: 'hidden' }}>-</div>
          )}

          {isVisible3 ? (
            <Typewriter
              options={{
                strings: '직장인 밴드 START-UP입니다!',
                autoStart: true,
              }}
            />
          ) : (
            <div style={{ visibility: 'hidden' }}>-</div>
          )}
        </Description>

        <SectionTitle>멤버</SectionTitle>
        <MemberSection>
          {Object.entries(MEMBERS).map(([key, member], index) => (
            <MemberContent 
              key={key}
              data-member={key}
              className={`member-card member-${key}`}
              onClick={() => member.sound && playSound(member.sound, member.name)}
              style={{
                animation: `cardSlideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.2}s both`,
                opacity: 0,
                transform: 'translateY(40px) scale(0.8)',
              }}
            >
              <PostitWrapper>
                <Postit />
                <OverlayImage 
                  data-member={key}
                  className={`member-${key}`}
                  style={{ opacity: playingMember === member.name ? 0.3 : 1 }} 
                >
                  <img 
                    src={member.profile} 
                    alt={member.name}
                  />
                  <MemberIcon>{member.emoji}</MemberIcon>
                </OverlayImage>
                {playingMember === member.name && <PlayingEmoji>{member.emoji}</PlayingEmoji>}
                <MemberName>{member.name}</MemberName>
                <MemberStats>
                  <StatItem>
                    <StatValue>#{member.role}</StatValue>
                  </StatItem>
                </MemberStats>
              </PostitWrapper>
            </MemberContent>
          ))}
        </MemberSection>

        <SectionTitle>플레이리스트</SectionTitle>
        {Object.entries(TRACKS).map(([trackKey, track]) => (
          <TrackSection key={trackKey}>
            <TrackTitle>#Track {trackKey.replace('track', '')}. {track.title}</TrackTitle>
            <TrackDescription>{track.description}</TrackDescription>
            <VideoWrapper>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${track.youtubeId}`}
                title={track.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoWrapper>

            <PracticeHistoryContainer>
              <PracticeHistory>
                <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#2d261a' }} />}>
                  <div style={{ fontWeight: 'bold', color: '#2d261a' }}>연습 기록</div>
                </AccordionSummary>
                <AccordionDetails>
                  {track.practiceHistory ? (
                    track.practiceHistory.map((practice, index) => (
                      <div key={practice.week}>
                        <PracticeHistoryListItem>
                          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ color: '#2d261a' }}>{practice.week}주차 ({practice.date})</div>
                            {playingMember === `${trackKey}Week${practice.week}` && (
                              <ProgressBarContainer>
                                <ProgressBar style={{ width: `${progress}%` }} />
                              </ProgressBarContainer>
                            )}
                          </div>
                          <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(practice.sound, `${trackKey}Week${practice.week}`)}>
                            {playingMember === `${trackKey}Week${practice.week}` ? (
                              <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                            ) : (
                              <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                            )}
                          </div>
                        </PracticeHistoryListItem>
                        {index < track.practiceHistory.length - 1 && <PracticeHistoryListItemSeperator />}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#2d261a' }}>연습을 기록할 경황이 없었던 시절..</div>
                  )}
                </AccordionDetails>
              </PracticeHistory>
            </PracticeHistoryContainer>
          </TrackSection>
        ))}

        <TrackSection>
          <TrackTitle>#Track ...</TrackTitle>
        </TrackSection>
      </Layout>
    </Container>
  )
}

export default App

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 25%, #0f0f0f 50%, #1a1a1a 75%, #2c2c2c 100%);
  padding: 0 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const Layout = styled.div`
  width: 100%;
  max-width: 1080px;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
`

const Head = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 490px) {
    margin-top: 50px;
  }
`
const Logo = styled.img`
  width: 50%;
  max-width: 300px;
  object-fit: contain;

  @media (max-width: 490px) {
    width: 55vw;
  }
`

const Description = styled.div`
  width: 100%;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 23px;
  /* color: #2d261a; */
  color: white;
`

const SectionTitle = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }

  @media (max-width: 490px) {
    margin-top: 50px;
    font-size: 28px;
  }
`
const MemberSection = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  justify-items: center;

  @media (max-width: 490px) {
    margin-top: 20px;
    grid-template-columns: repeat(2, 160px);
    gap: 16px;
    justify-content: center;
  }
`

const MemberContent = styled.div`
  width: 100%;
  max-width: 200px;
  height: 320px;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* 스티커 붙이는 애니메이션 */
  @keyframes stickerStickIn {
    0% {
      opacity: 0;
      transform: scale(0.6) rotate(-8deg) translateY(30px);
    }
    60% {
      opacity: 0.9;
      transform: scale(1.02) rotate(2deg) translateY(-3px);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg) translateY(0px);
    }
  }

  /* 카드 등장 애니메이션 */
  @keyframes cardSlideIn {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.8);
    }
    60% {
      opacity: 0.9;
      transform: translateY(-5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
  }

  /* 호버 효과 */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    
    /* 호버 시 이미지 효과 */
    img {
      transform: scale(1.05);
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 
        0 16px 40px rgba(0, 0, 0, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 490px) {
      transform: none;
      background: transparent;
      border-color: transparent;
      box-shadow: none;
      
      img {
        transform: none;
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }



  @media (max-width: 490px) {
    max-width: 160px;
    height: 240px;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
  }

  @media (max-width: 490px) {
    max-width: 160px;
    height: 240px;
    background: transparent !important;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
    
    /* 모바일에서 모든 멤버별 색상 테마 강제 제거 */
    &.member-minchan,
    &.member-rokwon,
    &.member-taejin,
    &.member-doyeon {
      background: transparent !important;
    }
  }
`



const PostitWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  


  @media (max-width: 490px) {
    padding: 0;
    
    &::before {
      display: none;
    }
  }
`

const Postit = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border-radius: 20px;
  pointer-events: none;

  @media (max-width: 490px) {
    display: none;
  }
`

const MemberIcon = styled.div`
  position: absolute;
  bottom: -8px;
  right: -8px;
  font-size: 64px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2) rotate(5deg);
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  }

  .member-card:hover & {
    transform: scale(1.2) rotate(5deg);
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 490px) {
    font-size: 40px;
    bottom: 0px;
    right: 0px;
  }
`

const OverlayImage = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.4);
    box-shadow: 
      0 12px 30px rgba(0, 0, 0, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }
  
  /* 데스크탑에서도 멤버별 색상 테마를 프로필 이미지에 적용 */
  &.member-minchan img {
    background: linear-gradient(135deg, ${MEMBERS.minchan.color.primary} 0%, ${MEMBERS.minchan.color.secondary} 100%);
  }
  
  &.member-rokwon img {
    background: linear-gradient(135deg, ${MEMBERS.rokwon.color.primary} 0%, ${MEMBERS.rokwon.color.secondary} 100%);
  }
  
  &.member-taejin img {
    background: linear-gradient(135deg, ${MEMBERS.taejin.color.primary} 0%, ${MEMBERS.taejin.color.secondary} 100%);
  }
  
  &.member-doyeon img {
    background: linear-gradient(135deg, ${MEMBERS.doyeon.color.primary} 0%, ${MEMBERS.doyeon.color.secondary} 100%);
  }


  @media (max-width: 490px) {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    
    /* 모바일에서 멤버별 색상 테마를 프로필 이미지에 적용 */
    &.member-minchan img {
      background: linear-gradient(135deg, ${MEMBERS.minchan.color.mobile.primary} 0%, ${MEMBERS.minchan.color.mobile.secondary} 100%);
    }
    
    &.member-rokwon img {
      background: linear-gradient(135deg, ${MEMBERS.rokwon.color.mobile.primary} 0%, ${MEMBERS.rokwon.color.mobile.secondary} 100%);
    }
    
    &.member-taejin img {
      background: linear-gradient(135deg, ${MEMBERS.taejin.color.mobile.primary} 0%, ${MEMBERS.taejin.color.mobile.secondary} 100%);
    }
    
    &.member-doyeon img {
      background: linear-gradient(135deg, ${MEMBERS.doyeon.color.mobile.primary} 0%, ${MEMBERS.doyeon.color.mobile.secondary} 100%);
    }
  }
`

const MemberName = styled.div`
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 28px;
  color: white;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;

  @media (max-width: 490px) {
    font-size: 20px;
    margin-bottom: 6px;
  }
`



const MemberStats = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  z-index: 2;
  margin-top: 4px;
  justify-content: center;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 490px) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 6px;
  }
`

const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 490px) {
    font-size: 12px;
  }
`

const PlayingEmoji = styled.div`  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  pointer-events: none;
  z-index: 3;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @media (max-width: 490px) {
    font-size: 50px;
  }
`

const TrackSection = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TrackTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  /* color: #2d261a; */
  color: white;
  margin-bottom: 5px;
`

const TrackDescription = styled.div`
  font-size: 18px;
  font-weight: 500;
  /* color: #868282; */
  color: white;
  margin-bottom: 20px;
`

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16/9;
  margin-bottom: 70px;

  @media (max-width: 490px) {
    margin-bottom: 15px;
  }
`

const PracticeHistoryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: -40px;

  @media (max-width: 490px) {
    margin-top: 0px;
  }
`

const PracticeHistory = styled(Accordion)`
  background-color: #f1f1ef;
  border-radius: 0px;
`
const PracticeHistoryListItem = styled.div`
  display: flex;
  justify-content: space-between;
`
const PracticeHistoryListItemSeperator = styled.div`
  height: 13px;
`
const ProgressBarContainer = styled.div`
  width: calc(100% - 10px);

  height: 6px;
  background-color: #ccc;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 6px;
`

const ProgressBar = styled.div`
  height: 100%;
  background-color: #2d261a;
  transition: width 0.2s ease;
`

