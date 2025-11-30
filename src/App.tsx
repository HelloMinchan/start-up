import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Typewriter from 'typewriter-effect'
import { LOGO_IMAGES, MEMBERS, TRACKS } from './assets'
import ChristmasHatImg from './assets/christmas-hat.png'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import Background from './components/Background'
import { Snowfall } from './components/Snowfall'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisible3, setIsVisible3] = useState(false)
  const [playingMember, setPlayingMember] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [activeSection, setActiveSection] = useState<string>('head')

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['head', 'members', 'tracks']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`[data-section="${sections[i]}"]`)
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY

          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
      <Snowfall />
      <Background
        currentMember={playingMember ? Object.keys(MEMBERS).find((key) => MEMBERS[key as keyof typeof MEMBERS].name === playingMember) : null}
      />
      <Layout>
        <TOCSidebar>
          <TOCItem
            onClick={() => {
              const headSection = document.querySelector('[data-section="head"]')
              headSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            isActive={activeSection === 'head'}
          >
            <TOCIcon>🎸</TOCIcon>
            <TOCLabel>START-UP</TOCLabel>
          </TOCItem>
          <TOCItem
            onClick={() => {
              const memberTitle = document.querySelector('[data-section="members"]')
              memberTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            isActive={activeSection === 'members'}
          >
            <TOCIcon>👥</TOCIcon>
            <TOCLabel>Members</TOCLabel>
          </TOCItem>
          <TOCItem
            onClick={() => {
              const tracksTitle = document.querySelector('[data-section="tracks"]')
              tracksTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            isActive={activeSection === 'tracks'}
          >
            <TOCIcon>🎵</TOCIcon>
            <TOCLabel>Tracks</TOCLabel>
          </TOCItem>
          <TOCItem
            onClick={() => {
              const tracksTitle = document.querySelector('[data-section="rules"]')
              tracksTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            isActive={activeSection === 'rules'}
          >
            <TOCIcon>🧾</TOCIcon>
            <TOCLabel>Rules</TOCLabel>
          </TOCItem>
        </TOCSidebar>

        <Head data-section="head">
          <HeadContent>
            <HeadTitle>
              <HeadLogo src={LOGO_IMAGES.logo} alt="START-UP" />
            </HeadTitle>
            <HeadDescription>
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
            </HeadDescription>

            <HeadStats>
              <HeadStatItem
                onClick={() => {
                  const memberTitle = document.querySelector('[data-section="members"]')
                  memberTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{ cursor: 'pointer' }}
              >
                <HeadStatNumber>{Object.keys(MEMBERS).length}</HeadStatNumber>
                <HeadStatLabel>Members</HeadStatLabel>
              </HeadStatItem>
              <HeadStatItem
                onClick={() => {
                  const tracksTitle = document.querySelector('[data-section="tracks"]')
                  tracksTitle?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{ cursor: 'pointer' }}
              >
                <HeadStatNumber>{Object.keys(TRACKS).length}</HeadStatNumber>
                <HeadStatLabel>Tracks</HeadStatLabel>
              </HeadStatItem>
              <HeadStatItem>
                <HeadStatNumber>∞</HeadStatNumber>
                <HeadStatLabel>Passion</HeadStatLabel>
              </HeadStatItem>
            </HeadStats>
          </HeadContent>
        </Head>

        <SectionTitle data-section="members">Members</SectionTitle>
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
                <OverlayImage data-member={key} className={`member-${key}`} style={{ opacity: playingMember === member.name ? 0.3 : 1 }}>
                  <ChristmasHat src={ChristmasHatImg} />
                  <img src={member.profile} alt={member.name} />
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

        <SectionTitle data-section="tracks">Tracks</SectionTitle>
        <TracksContainer>
          {Object.entries(TRACKS).map(([trackKey, track], index) => (
            <TrackRow key={trackKey} isEven={index % 2 === 1}>
              <div data-track={trackKey} style={{ display: 'contents' }}>
                <TrackCardHeader isEven={index % 2 === 1}>
                  <TrackHeaderContent isEven={index % 2 === 1}>
                    <TrackHeaderTop>
                      <TrackNumber>#{trackKey.replace('track', '')}</TrackNumber>
                      <TrackTitle>{track.title}</TrackTitle>
                    </TrackHeaderTop>
                    <TrackDescription>{track.description}</TrackDescription>
                  </TrackHeaderContent>
                </TrackCardHeader>

                <TrackContent isEven={index % 2 === 1}>
                  <VideoSection>
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
                  </VideoSection>

                  <PracticeSection>
                    <PracticeHistoryContainer>
                      <PracticeHistoryTitle>연습 기록</PracticeHistoryTitle>

                      <PracticeHistoryList>
                        {track.practiceHistory ? (
                          track.practiceHistory.map((practice, practiceIndex) => (
                            <PracticeHistoryItem key={practice.week}>
                              <PracticeInfo>
                                <PracticeWeek>{practice.week}주차</PracticeWeek>
                                <PracticeDate>({practice.date})</PracticeDate>
                                {playingMember === `${trackKey}Week${practice.week}` && (
                                  <ProgressBarContainer>
                                    <ProgressBar style={{ width: `${progress}%` }} />
                                  </ProgressBarContainer>
                                )}
                              </PracticeInfo>
                              <PlayButton onClick={() => playSound(practice.sound, `${trackKey}Week${practice.week}`)}>
                                {playingMember === `${trackKey}Week${practice.week}` ? (
                                  <PauseCircleFilledIcon style={{ fontSize: '24px', color: '#667eea' }} />
                                ) : (
                                  <PlayCircleFilledWhiteIcon style={{ fontSize: '24px', color: '#667eea' }} />
                                )}
                              </PlayButton>
                            </PracticeHistoryItem>
                          ))
                        ) : (
                          <NoPracticeRecord>연습을 기록할 경황이 없었던 시절..</NoPracticeRecord>
                        )}
                      </PracticeHistoryList>
                    </PracticeHistoryContainer>
                  </PracticeSection>
                </TrackContent>
              </div>
            </TrackRow>
          ))}
        </TracksContainer>

        <SectionTitle data-section="rules">Rules</SectionTitle>
        <RulesContainer>
          <RuleItem>
            <>하나. 연습곡은 공정하게 번갈아가며 선정합니다.</>
            <RuleSubItem>(록원 ﹥ 태진 ﹥ 지혜 ﹥ 도연 ﹥ 지혁 ﹥ 민찬)</RuleSubItem>
          </RuleItem>
          <RuleItem>둘. 선정된 곡은 내가 고른 곡처럼 즐겁게 연주합니다.</RuleItem>
          <RuleItem>셋. 하나의 곡이 마무리되면 기념 회식을 합니다.</RuleItem>
          <RuleItem>넷. 합주 연습은 매주 목요일 8시입니다.</RuleItem>
          <RuleItem>다섯. 회비는 매월 7일 10만원입니다.</RuleItem>
        </RulesContainer>

        <CopyrightSection>
          <TeamOfficialMailText>band.startup.official@gmail.com</TeamOfficialMailText>
          <CopyrightText>© 2025 start-up.band</CopyrightText>
        </CopyrightSection>
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

const TOCSidebar = styled.div`
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;

  @media (max-width: 1200px) {
    display: none;
  }
`

const TOCItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isActive ? '1' : '0.6')};
  position: relative;

  &:hover {
    transform: translateX(8px);
    opacity: 1;

    &::after {
      width: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
`

const TOCIcon = styled.span`
  font-size: 20px;
  opacity: 0.9;
`

const TOCLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
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
  width: 100%;

  @media (max-width: 600px) {
    margin-top: 50px;
  }
`

const HeadContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;

  @media (max-width: 600px) {
    padding: 30px 0;
  }
`

const HeadLeft = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeadRight = styled.div`
  flex: 1;
  max-width: 400px;
  text-align: center;
  color: white;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`

const HeadTitle = styled.h1`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`

const HeadLogo = styled.img`
  height: 180px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

  @media (max-width: 600px) {
    height: 110px;
  }
`

const HeadDescription = styled.div`
  font-size: 22px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 50px;
  font-weight: 500;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 40px;
    line-height: 1.6;
  }
`

const HeadStats = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  flex-wrap: nowrap;

  @media (max-width: 600px) {
    gap: 15px;
    flex-wrap: wrap;
  }
`

const HeadStatItem = styled.div`
  text-align: center;
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 100px;
  flex: 1;
  max-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    padding: 18px 20px;
    min-width: 90px;
    max-width: none;
  }
`

const HeadStatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 26px;
    margin-bottom: 8px;
  }
`

const HeadStatLabel = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 13px;
    letter-spacing: 1px;
  }
`
const Logo = styled.img`
  width: 50%;
  max-width: 300px;
  object-fit: contain;

  @media (max-width: 600px) {
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
  margin-top: 130px;
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

  @media (max-width: 600px) {
    margin-top: 50px;
    font-size: 28px;
  }
`
const MemberSection = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0px 100px;
  justify-items: center;
  max-width: calc(200px * 3 + 100px * 2);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    margin-top: 20px;
    grid-template-columns: repeat(2, 160px);
    gap: 0px 16px;
    justify-content: center;
    max-width: none; /* 모바일에서는 제한 해제 */
  }
`

const MemberContent = styled.div`
  width: 100%;
  max-width: 200px;
  height: 320px;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
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
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    max-width: 160px;
    height: 210px;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
  }

  @media (max-width: 600px) {
    max-width: 160px;
    height: 210px;
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    font-size: 40px;
    bottom: 0px;
    right: 0px;
  }
`

const OverlayImage = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  margin-bottom: 20px;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
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

  &.member-jihye img {
    background: linear-gradient(135deg, ${MEMBERS.jihye.color.primary} 0%, ${MEMBERS.jihye.color.secondary} 100%);
  }

  &.member-jihyeok img {
    background: linear-gradient(135deg, ${MEMBERS.jihyeok.color.primary} 0%, ${MEMBERS.jihyeok.color.secondary} 100%);
  }

  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
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

    &.member-jihye img {
      background: linear-gradient(135deg, ${MEMBERS.jihye.color.mobile.primary} 0%, ${MEMBERS.jihye.color.mobile.secondary} 100%);
    }

    &.member-jihyeok img {
      background: linear-gradient(135deg, ${MEMBERS.jihyeok.color.mobile.primary} 0%, ${MEMBERS.jihyeok.color.mobile.secondary} 100%);
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 6px;
  }
`

const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`

const PlayingEmoji = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  pointer-events: none;
  z-index: 3;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @media (max-width: 600px) {
    font-size: 50px;
  }
`

const TracksContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr; /* 기본적으로 한 행에 하나씩 */
  gap: 30px;
  justify-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`

const TrackRow = styled.div<{ isEven: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 60px;
  padding: 0;

  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`

const TrackCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0) scale(1);
  z-index: 1;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 20px;
    border-radius: 16px;
    transform: none !important;
    z-index: 1;

    &:hover {
      transform: none !important;
    }
  }
`

const TrackCardHeader = styled.div<{ isEven: boolean }>`
  width: 100%;
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 0;

  /* 짝수 트랙의 경우 텍스트 정렬을 오른쪽으로 */
  text-align: ${(props) => (props.isEven ? 'right' : 'left')};
`

const TrackHeaderContent = styled.div<{ isEven: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isEven ? 'flex-end' : 'flex-start')};
  gap: 8px;
  margin-bottom: 0;
`

const TrackHeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TrackNumber = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  letter-spacing: 1px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const TrackTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`

const TrackDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-align: inherit;
`

const PracticeHistoryTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  text-align: center;

  /* 데스크탑에서는 숨김 */
  @media (min-width: 491px) {
    display: none;
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const PracticeHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 8px;
`

const PracticeHistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: visible;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateX(4px);
  }
`

const PracticeInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`

const PracticeWeek = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const PracticeDate = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 600px) {
    font-size: 12px;
  }
`

const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.3);
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`

const NoPracticeRecord = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  padding: 20px;
`

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const VideoSection = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  /* overflow: hidden; */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`

const PracticeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TrackContent = styled.div<{ isEven: boolean }>`
  width: 100%;
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15px;

  /* 짝수 트랙의 경우 순서를 바꿈 */
  flex-direction: ${(props) => (props.isEven ? 'row-reverse' : 'row')};

  & > div {
    flex: 1;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
`

const PracticeHistoryContainer = styled.div`
  width: 100%;
  margin-top: 0px;
  overflow: visible;
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

const CopyrightSection = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const CopyrightText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
`

const TeamOfficialMailText = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
`

const RulesContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr; /* 기본적으로 한 행에 하나씩 */
  gap: 30px;
  justify-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`
const RuleItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  justify-items: center;
  font-size: 20px;
  font-weight: 500;
  color: white;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: white;
  }
`
const RuleSubItem = styled.div`
  margin-top: -25px;
  font-size: 18px;

  @media (max-width: 600px) {
    margin-top: -17px;
    font-size: 13px;
  }
`

/**
 * Christmas
 */
const ChristmasHat = styled.img`
  all: unset;
  display: block;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  object-fit: contain !important;
  background-color: none !important;
  background: none !important;

  position: absolute;
  top: -75px;
  left: 15%;
  max-width: 120px;
  z-index: 50;
  pointer-events: none;

  @media (max-width: 600px) {
    top: -50px;
    left: 20%;
    max-width: 70px;
  }
`
