"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Header() {




 
  
  return (
    <div className='w-full  bg-slate-700 p-[15px] text-white ' >
        <div className='max-w-[1140px] flex  justify-between items-center '>
            <div  >
            <Link href="/" >
              <img className='w-[120px]' src='https://www.wscubetech.com/images/ws-cube-white-logo.svg' />
            </Link>
            </div>
            <div className='flex ' >
                    <div className='px-5'>
                      <Link href="/add_quiz" >Add Qizz</Link>
                    </div>
                    <div className='px-5'> 
                   
                    <Link href="/play" > Play Quizz </Link>
                    </div>
                    <div className='px-5'> 
                   
                    <Link href="/view_quiz" > View Quizz </Link>
                    </div>
            </div>
        </div>
    </div>
  )
}
