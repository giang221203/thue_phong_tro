import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'

import {  AboutUs, Home, PublicLayout,Ouragents,Properties,Search } from './pages/public'
import { Modal } from './components'
import { useAppStore } from './store/useAppStore'


function App() {
  const {isShowModal } = useAppStore()      // lấy dữ liệu trong store của zuntand

  return (
    <div className='relative'>
      {isShowModal && <Modal/>}    {/* isShowModal bằng true thì sẽ hiện modal */}
    
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout/>}>
        <Route path={path.HOME} element={<Home/>}/>
        <Route path={path.ABOUT_US} element={<AboutUs/>}/>
        <Route path={path.SEARCH} element={<Search/>}/>
        <Route path={path.PROPERTIES} element={<Properties/>}/>
        <Route path={path.OUR_AGENTS} element={<Ouragents/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
