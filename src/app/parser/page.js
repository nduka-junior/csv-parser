"use client"
import Tabb from '@/components/Tabb'
import React from 'react'
import { useContext } from 'react'
import { Context } from '@/components/ContextProvider'
import { useRouter } from 'next/navigation'
function page() {
    const { data,user} = useContext(Context)

    const router = useRouter()
    if(!data) return router.push(`/user/${user?.uid}`)
  return (
    <div className='p-10'><Tabb /></div>
  )
}

export default page