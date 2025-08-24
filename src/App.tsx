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
      <Background />
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
              onClick={() => member.sound && playSound(member.sound, member.name)}
              style={{
                animation: `stickerStickIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.3}s both`,
                opacity: 0,
                transform: 'scale(0.6) rotate(-8deg) translateY(30px)',
              }}
            >
              <PostitWrapper>
                <Postit src={POSTIT_IMAGES.postit} />
                <OverlayImage 
                  src={member.profile} 
                  style={{ opacity: playingMember === member.name ? 0.3 : 1 }} 
                />
                {playingMember === member.name && <PlayingEmoji>{member.emoji}</PlayingEmoji>}
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
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

  font-size: 30px;
  font-weight: 500;
  /* color: #257180; */
  color: white;

  @media (max-width: 490px) {
    margin-top: 50px;
  }
`
const MemberSection = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  justify-items: center;

  @media (max-width: 490px) {
    margin-top: 20px;
    grid-template-columns: repeat(2, 140px);
    justify-content: center;
  }
`

const MemberContent = styled.div`
  width: 100%;
  max-width: 200px;
  height: 330px;
  cursor: pointer;
  position: relative;

  @media (max-width: 490px) {
    max-width: 140px;
    height: 250px;
  }

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

  /* 호버 효과 */
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    transform: scale(1.03) translateY(-3px);
  }
`
const PostitWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  height: 330px;

  @media (max-width: 490px) {
    max-width: 140px;
    height: 250px;
  }

  /* 스티커 그림자 효과 */
  filter: drop-shadow(0 8px 25px rgba(0, 0, 0, 0.15));
  
  /* 미묘한 떨림 효과 */
  animation: subtleFloat 3s ease-in-out infinite;
  
  @keyframes subtleFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
  }
`
const Postit = styled.img`
  max-width: 200px;
  height: 330px;

  @media (max-width: 490px) {
    max-width: 140px;
    height: 250px;
  }

  /* 스티커 자연스러운 회전 */
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(0deg);
  }
`

const OverlayImage = styled.img`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  max-width: 300px;
  pointer-events: none;
  border-radius: 5px;
`

const MemberName = styled.div`
  position: absolute;
  bottom: 37px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 23px;
  color: #2d261a;

  @media (max-width: 490px) {
    font-size: 20px;
    bottom: 31px;
  }
`

const MemberRole = styled.div`
  position: absolute;
  bottom: 13px;
  width: 100%;
  text-align: center;
  color: #868282;
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 490px) {
    font-size: 14px;
    bottom: 12px;
  }
`

const PlayingEmoji = styled.div`
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 70px;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 490px) {
    font-size: 40px;
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
