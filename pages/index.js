import Head from 'next/head'
import LoginLayout from '../src/layouts/LoginLayout'
import PageLayout from '../src/layouts/PageLayout'

export default function Home() {
  return (
    <main>
      <PageLayout style={'bg-[#ffffff] w-screen h-screen'}>
        <LoginLayout />
      </PageLayout>
    </main>
  )
}
