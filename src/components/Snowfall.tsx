import { useEffect, useState } from 'react'

export const Snowfall = ({ count = 100 }) => {
  const [snowflakes, setSnowflakes] = useState([])

  // 한 번만 생성
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
          ❄
        </div>
      ))}
    </>
  )
}
