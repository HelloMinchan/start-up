import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import LogoImage from './assets/logo-white.png'
import PostitImage from './assets/postit.png'
import MinchanProfile from './assets/profile/minchan.png'
import RokwonProfile from './assets/profile/rokwon.png'
import TaejinProfile from './assets/profile/taejin.png'
import DoyeonProfile from './assets/profile/doyeon.png'
import Typewriter from 'typewriter-effect'
import MinchanSound from './assets/sound/minchan.m4a'
import RokwonSound from './assets/sound/rokwon.m4a'
import TaejinSound from './assets/sound/taejin.mp3'

import Track2Week2 from './assets/sound/track2/week2.m4a'
import Track2Week3 from './assets/sound/track2/week3.m4a'
import Track2Week4 from './assets/sound/track2/week4.m4a'
import Track2Week5 from './assets/sound/track2/week5.m4a'

import Track3Week1 from './assets/sound/track3/week1.m4a'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisible3, setIsVisible3] = useState(false)
  const [playingMember, setPlayingMember] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState<number>(0)

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
      <Layout>
        <Head>
          <Logo src={LogoImage} />
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
          <MemberContent onClick={() => playSound(MinchanSound, '민찬')}>
            <PostitWrapper>
              <Postit src={PostitImage} />
              <OverlayImage src={MinchanProfile} style={{ opacity: playingMember === '민찬' ? 0.3 : 1 }} />
              {playingMember === '민찬' && <PlayingEmoji>🎹</PlayingEmoji>}
              <MemberName>민찬</MemberName>
              <MemberRole>키보드 / 신디사이저</MemberRole>
            </PostitWrapper>
          </MemberContent>

          <MemberContent onClick={() => playSound(RokwonSound, '록원')}>
            <PostitWrapper>
              <Postit src={PostitImage} />
              <OverlayImage src={RokwonProfile} style={{ opacity: playingMember === '록원' ? 0.3 : 1 }} />
              {playingMember === '록원' && <PlayingEmoji>🎸</PlayingEmoji>}
              <MemberName>록원</MemberName>
              <MemberRole>기타</MemberRole>
            </PostitWrapper>
          </MemberContent>

          <MemberContent onClick={() => playSound(TaejinSound, '태진')}>
            <PostitWrapper>
              <Postit src={PostitImage} />
              <OverlayImage src={TaejinProfile} style={{ opacity: playingMember === '태진' ? 0.3 : 1 }} />
              {playingMember === '태진' && <PlayingEmoji>🎸</PlayingEmoji>}
              <MemberName>태진</MemberName>
              <MemberRole>베이스</MemberRole>
            </PostitWrapper>
          </MemberContent>

          <MemberContent>
            <PostitWrapper>
              <Postit src={PostitImage} />
              <OverlayImage src={DoyeonProfile} style={{ opacity: playingMember === 'Drummer' ? 0.3 : 1 }} />
              {playingMember === 'Drummer' && <PlayingEmoji>🥁</PlayingEmoji>}
              <MemberName>도연</MemberName>
              <MemberRole>드럼</MemberRole>
            </PostitWrapper>
          </MemberContent>

          {/* <MemberContent>
            <PostitWrapper>
              <Postit src={PostitImage} />
              <OverlayImage src={DefaultProfile} style={{ opacity: playingMember === 'Vocalist' ? 0.3 : 1 }} />
              {playingMember === 'Vocalist' && <PlayingEmoji>🎤</PlayingEmoji>}
              <MemberName>???</MemberName>
              <MemberRole>(Vocalist)</MemberRole>
            </PostitWrapper>
          </MemberContent> */}
        </MemberSection>

        <SectionTitle>플레이리스트</SectionTitle>
        <TrackSection>
          <TrackTitle>#Track 1. Falling Slowly</TrackTitle>
          <TrackDescription>(✅ 완곡, 25.01.12 ~ 25.06.29)</TrackDescription>
          <VideoWrapper>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SxE8f80DFpM"
              title="Falling Slowly"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>

          <PracticeHistoryContainer>
            <PracticeHistory>
              <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: '#2d261a' }} />}>
                <div style={{ fontWeight: 'bold', color: '#2d261a' }}>연습 기록</div>
              </AccordionSummary>
              <AccordionDetails>연습을 기록할 경황이 없었던 시절..</AccordionDetails>
            </PracticeHistory>
          </PracticeHistoryContainer>
        </TrackSection>

        <TrackSection>
          <TrackTitle>#Track 2. 예뻤어</TrackTitle>
          <TrackDescription>(✅ 완곡, 25.07.02 ~ 25.07.30)</TrackDescription>
          <VideoWrapper>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xejMrLT0Q7M?si=2kZJLgnLTTk3l8ag"
              title="예뻤어"
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
                <PracticeHistoryListItem>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ color: '#2d261a' }}>2주차 (25.07.09)</div>
                    {playingMember === 'Track2Week2' && (
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${progress}%` }} />
                      </ProgressBarContainer>
                    )}
                  </div>
                  <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(Track2Week2, 'Track2Week2')}>
                    {playingMember === 'Track2Week2' ? (
                      <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                    ) : (
                      <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                    )}
                  </div>
                </PracticeHistoryListItem>

                <PracticeHistoryListItemSeperator />

                <PracticeHistoryListItem>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ color: '#2d261a' }}>3주차 (25.07.16)</div>
                    {playingMember === 'Track2Week3' && (
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${progress}%` }} />
                      </ProgressBarContainer>
                    )}
                  </div>
                  <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(Track2Week3, 'Track2Week3')}>
                    {playingMember === 'Track2Week3' ? (
                      <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                    ) : (
                      <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                    )}
                  </div>
                </PracticeHistoryListItem>

                <PracticeHistoryListItemSeperator />

                <PracticeHistoryListItem>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ color: '#2d261a' }}>4주차 (25.07.23)</div>
                    {playingMember === 'Track2Week4' && (
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${progress}%` }} />
                      </ProgressBarContainer>
                    )}
                  </div>
                  <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(Track2Week4, 'Track2Week4')}>
                    {playingMember === 'Track2Week4' ? (
                      <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                    ) : (
                      <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                    )}
                  </div>
                </PracticeHistoryListItem>

                <PracticeHistoryListItemSeperator />

                <PracticeHistoryListItem>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ color: '#2d261a' }}>5주차 (25.07.30)</div>
                    {playingMember === 'Track2Week5' && (
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${progress}%` }} />
                      </ProgressBarContainer>
                    )}
                  </div>
                  <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(Track2Week5, 'Track2Week5')}>
                    {playingMember === 'Track2Week5' ? (
                      <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                    ) : (
                      <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                    )}
                  </div>
                </PracticeHistoryListItem>
              </AccordionDetails>
            </PracticeHistory>
          </PracticeHistoryContainer>
        </TrackSection>

        <TrackSection>
          <TrackTitle>#Track 3. 박하사탕</TrackTitle>
          <TrackDescription>(🔥 연습, 25.08.07 ~)</TrackDescription>
          <VideoWrapper>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/fDQzDsAW434?si=plBauuN_dba4V8E1"
              title="박하사탕"
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
                <PracticeHistoryListItem>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ color: '#2d261a' }}>1주차 (25.08.07)</div>
                    {playingMember === 'Track3Week1' && (
                      <ProgressBarContainer>
                        <ProgressBar style={{ width: `${progress}%` }} />
                      </ProgressBarContainer>
                    )}
                  </div>
                  <div style={{ display: 'flex', color: '#2d261a' }} onClick={() => playSound(Track3Week1, 'Track3Week1')}>
                    {playingMember === 'Track3Week1' ? (
                      <PauseCircleFilledIcon style={{ fontSize: '30px' }} />
                    ) : (
                      <PlayCircleFilledWhiteIcon style={{ fontSize: '30px' }} />
                    )}
                  </div>
                </PracticeHistoryListItem>
              </AccordionDetails>
            </PracticeHistory>
          </PracticeHistoryContainer>
        </TrackSection>

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
  min-height: 100%;
  /* background-color: #f4eae0; */
  background-color: #373535;
  padding: 0 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Layout = styled.div`
  width: 100%;
  max-width: 1080px;
  margin-bottom: 50px;
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
  display: flex;
  cursor: pointer;
  position: relative;

  @media (max-width: 490px) {
    max-width: 140px;
    height: 250px;
  }
`
const PostitWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1;

  @media (max-width: 490px) {
    max-width: 140px;
  }
`
const Postit = styled.img`
  max-width: 200px;
  height: 330px;

  position: relative;

  @media (max-width: 490px) {
    max-width: 140px;
    height: 250px;
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
  bottom: 40px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 23px;
  color: #2d261a;

  @media (max-width: 490px) {
    font-size: 20px;
    bottom: 32px;
  }
`

const MemberRole = styled.div`
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
  color: #868282;
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 490px) {
    font-size: 14px;
    bottom: 13px;
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
