import React from 'react'
import { Router, Routes, Route } from '../routes/routing.web';
import {Login,Survey, SurveyDetail} from '../../screens'
import ProtectedRoute from '../routes/ProtectedRoute'

const WebNavigation = () => {
  return (
    <Router>
    <Routes>
    <Route path={'/:event/login'} element={<Login />}/>
    {/* <Route path="/:event/" element={
      <ProtectedRoute>
      <Home/>
      </ProtectedRoute>
      }/> */}
        <Route path="/:event/survey" element={
      <ProtectedRoute>
      <Survey/>
      </ProtectedRoute>
      }/>
       <Route path="/:event/survey/:id" element={
      <ProtectedRoute>
      <SurveyDetail/>
      </ProtectedRoute>
      }/>
    </Routes>
    </Router>
  )
}

export default WebNavigation