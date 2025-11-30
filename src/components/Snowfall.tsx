import { useEffect, useState } from 'react'

export const Snowfall = () => {
  const [count, setCount] = useState(() => (window.innerWidth <= 600 ? 40 : 70))
  const [snowflakes, setSnowflakes] = useState([])

  // 화면 크기 변경 시 count 업데이트
  useEffect(() => {
    const handleResize = () => {
      setCount(window.innerWidth <= 600 ? 40 : 70)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // count 변경될 때마다 눈송이 생성
  useEffect(() => {
    const flakes = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 5 + Math.random() * 15,
      speed: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
    setSnowflakes(flakes)
  }, [count])

  return (
    <>
      {snowflakes.map((flake, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${flake.left}vw`,
            fontSize: `${flake.size}px`,
            animationDuration: `${flake.speed}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ✻
        </div>
      ))}
    </>
  )
}
