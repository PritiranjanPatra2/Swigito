import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function First() {
  return (
    <>
     <div className="flex flex-col h-screen">
        <header className="fixed top-0 left-0 w-full z-10">
          <Header />
        </header>
        <main className="flex-grow mt-[4rem] flex flex-wrap justify-center items-start bg-zinc-300 overflow-y-auto">
          <Outlet />
        </main>
          <Footer />
      </div>
    </>
  )
}

export default First;
