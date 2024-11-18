"use client"
import Quizgreeting from '@/components/coach/Quizgreeting'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const Greeting = () => {
    const searchParams = useSearchParams()
    const score = searchParams.get("score") || "0"
  return (
    <div>
      <Quizgreeting score={score}></Quizgreeting>
    </div>
  )
}

export default Greeting
