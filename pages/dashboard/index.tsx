import { Layout } from '@/components/Dashboard/Shared/Layout'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'PakDropify dashboard',
  description: '...',
}

const Dashboard = () => {
  return (
    <div className='w-screen'>
        <Layout />
    </div>
  )
}

export default Dashboard