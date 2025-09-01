import { useState } from 'react'
import styled from '@emotion/styled'
import { TRACKS } from '../assets'

const LPCollection = () => {
  const [isLPPlaying, setIsLPPlaying] = useState<boolean>(false)

  const toggleLP = () => {
    setIsLPPlaying(!isLPPlaying)
  }

  return (
    <LPCollectionSection>
      <LPPlayer>
        <LPRecord 
          onClick={toggleLP}
          style={{ cursor: 'pointer' }}
          isPlaying={isLPPlaying}
        >
          <LPCenter>
            <LPPlayIcon>
              {isLPPlaying ? '⏸️' : '▶️'}
            </LPPlayIcon>
          </LPCenter>
        </LPRecord>
        <LPNeedle />
        <LPBase />
      </LPPlayer>
      
      <LPInfo>
        <LPInfoTitle>Vinyl Collection</LPInfoTitle>
        <LPInfoDescription>
          아날로그의 따뜻함과 디지털의 편리함을 모두 담은<br />
          START-UP만의 특별한 음악 세계를 경험해보세요
        </LPInfoDescription>
        <LPStats>
          <LPStatItem>
            <LPStatNumber>4</LPStatNumber>
            <LPStatLabel>Tracks</LPStatLabel>
          </LPStatItem>
          <LPStatItem>
            <LPStatNumber>∞</LPStatNumber>
            <LPStatLabel>Passion</LPStatLabel>
          </LPStatItem>
          <LPStatItem>
            <LPStatNumber>100%</LPStatNumber>
            <LPStatLabel>Real</LPStatLabel>
          </LPStatItem>
        </LPStats>
      </LPInfo>
    </LPCollectionSection>
  )
}

export default LPCollection

const LPCollectionSection = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  @media (max-width: 490px) {
    flex-direction: column;
    gap: 40px;
    margin-top: 30px;
    padding: 20px 0;
  }
`

const LPPlayer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 490px) {
    width: 250px;
    height: 250px;
  }
`

const LPRecord = styled.div<{ isPlaying: boolean }>`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://img.youtube.com/vi/${TRACKS.track1.youtubeId}/maxresdefault.jpg') center center;
  background-size: cover;
  border: 8px solid #333;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  position: relative;
  animation: ${props => props.isPlaying ? 'rotate 20s linear infinite' : 'none'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.isPlaying ? 'none' : 'scale(1.02)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    background: #1a1a1a;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #333;
    z-index: 2;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 490px) {
    width: 230px;
    height: 230px;
    border-width: 6px;
    
    &::before {
      width: 50px;
      height: 50px;
      border-width: 2px;
    }
  }
`

const LPCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  @media (max-width: 490px) {
    width: 60px;
    height: 60px;
  }
`

const LPPlayIcon = styled.div`
  font-size: 16px;
  margin-top: 8px;
  opacity: 0.9;
  transition: all 0.3s ease;
  
  @media (max-width: 490px) {
    font-size: 14px;
    margin-top: 6px;
  }
`

const LPNeedle = styled.div`
  position: absolute;
  top: -20px;
  right: 60px;
  width: 4px;
  height: 120px;
  background: linear-gradient(90deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
  border-radius: 2px;
  transform: rotate(-15deg);
  transform-origin: bottom center;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    width: 20px;
    height: 20px;
    background: #8b4513;
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 490px) {
    top: -15px;
    right: 50px;
    height: 100px;
    
    &::before {
      width: 16px;
      height: 16px;
    }
  }
`

const LPBase = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 20px;
  background: linear-gradient(90deg, #2c2c2c 0%, #1a1a1a 50%, #2c2c2c 100%);
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);

  @media (max-width: 490px) {
    width: 160px;
    height: 16px;
    bottom: -30px;
  }
`

const LPInfo = styled.div`
  flex: 1;
  max-width: 400px;
  text-align: center;
  color: white;

  @media (max-width: 490px) {
    max-width: 100%;
  }
`

const LPInfoTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 490px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`

const LPInfoDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  font-weight: 400;

  @media (max-width: 490px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`

const LPStats = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 490px) {
    gap: 20px;
  }
`

const LPStatItem = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 490px) {
    padding: 15px;
  }
`

const LPStatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 490px) {
    font-size: 22px;
    margin-bottom: 6px;
  }
`

const LPStatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 490px) {
    font-size: 12px;
  }
`
