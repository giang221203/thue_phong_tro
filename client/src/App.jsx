import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'

import {  AboutUs, Home, PublicLayout,Ouragents,Properties,Search } from './pages/public'

function App() {
  return (
    <div>
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
