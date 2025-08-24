import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 배경 파장 애니메이션
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 확장 애니메이션
    const waves: Array<{
      radius: number
      speed: number
      opacity: number
      thickness: number
      isActive: boolean
      initialScale: number
    }> = []
    
    const maxRadius = 400
    const baseSpeed = 0.6 // 더욱 부드럽고 정교한 속도
    let patternTimer = 0
    const patternInterval = 6000 // 6초마다 패턴 반복 (더 여유로운 리듬)
    
    // 초기 파장들 생성 (비활성 상태로)
    for (let i = 0; i < 3; i++) { // 3개 파동
      waves.push({
        radius: 0,
        speed: baseSpeed + Math.random() * 0.3, // 속도 변동을 줄여서 더 정교하게
        opacity: 1,
        thickness: Math.random() * 0.8 + 1.2, // 더욱 얇고 세련된 선
        isActive: false,
        initialScale: 0.2, // 더욱 미묘한 시작 스케일
      })
    }
    
    // 3초 후에 첫 번째 패턴 시작
    const startAnimation = () => {
      createPattern()
      animate()
    }
    
    // '두둥 둥' 패턴 생성
    const createPattern = () => {
      // 모든 파동을 초기화하고 활성화
      waves.forEach((wave, index) => {
        if (index === 0) {
          // 첫 번째 파동은 즉시 활성화
          wave.isActive = true
          wave.radius = 0
          wave.opacity = 1
        } else if (index === 1) {
          // 두 번째 파동은 지연 후 활성화
          wave.isActive = false
          wave.radius = 0
          wave.opacity = 1
          setTimeout(() => {
            wave.isActive = true
            wave.radius = 0
            wave.opacity = 1
          }, 400) // 0.7초 지연
        } else if (index === 2) {
          // 세 번째 파동은 약간의 지연 후 활성화 (첫 번째와 겹치지 않도록)
          wave.isActive = false
          wave.radius = 0
          wave.opacity = 1
          setTimeout(() => {
            wave.isActive = true
            wave.radius = 0
            wave.opacity = 1
          }, 1300) // 0.3초 지연
        }
      })
    }
    
    setTimeout(startAnimation, 2000)
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 패턴 타이머 업데이트
      patternTimer += 16.67 // 약 60fps
      
      // 5초마다 새로운 패턴 생성 (기존 패턴이 완전히 끝난 후)
      if (patternTimer >= patternInterval) {
        // 모든 파동이 비활성 상태인지 확인
        const allWavesInactive = waves.every(wave => !wave.isActive)
        if (allWavesInactive) {
          patternTimer = 0
          createPattern()
        }
      }
      
      // 모든 파장 업데이트 및 그리기
      waves.forEach((wave, index) => {
        if (wave.isActive) {
          wave.radius += wave.speed
          // 파동이 퍼질수록 희미해지도록 투명도 조정 (더욱 부드럽게)
          wave.opacity = Math.max(0, 1 - (wave.radius / maxRadius) * 0.6)
          
          if (wave.opacity > 0.005) { // 더욱 미묘한 임계값
            // "두둥 둥" 느낌을 위한 스케일 애니메이션 (더욱 부드럽게)
            const scale = wave.radius < 80 ? 
              wave.initialScale + (wave.radius / 80) * (1 - wave.initialScale) : 1
            
            // 메인 원 (더욱 미묘하고 세련되게)
            ctx.beginPath()
            ctx.arc(canvas.width / 2, canvas.height / 2, wave.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity * 0.25})` // 더욱 미묘한 투명도
            ctx.lineWidth = wave.thickness * scale
            ctx.stroke()
            
            // 보조 원 (안쪽, 더욱 미묘하게)
            if (wave.radius > 25) {
              ctx.beginPath()
              ctx.arc(canvas.width / 2, canvas.height / 2, wave.radius - 20, 0, Math.PI * 2)
              ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity * 0.12})` // 더욱 미묘한 투명도
              ctx.lineWidth = 1
              ctx.stroke()
            }
            
            // 세 번째 원 (가장 미묘한 효과)
            if (wave.radius > 40) {
              ctx.beginPath()
              ctx.arc(canvas.width / 2, canvas.height / 2, wave.radius - 35, 0, Math.PI * 2)
              ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity * 0.06})` // 매우 미묘한 투명도
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          } else {
            // 파동이 너무 투명해지면 비활성화
            wave.isActive = false
          }
        }
      })
      
      requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
      <Overlay />
    </BackgroundContainer>
  )
}

export default Background

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    rgba(20, 20, 20, 0.08) 30%,
    rgba(15, 15, 15, 0.12) 60%,
    rgba(10, 10, 10, 0.18) 100%
  );
  pointer-events: none;
  z-index: 1;
`
