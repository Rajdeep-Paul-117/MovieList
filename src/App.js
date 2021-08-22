import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Result from './components/Result'
import Home from './components/Home'
import Favourite from './components/Favourite'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/results' exact component={Result}></Route>
        <Route path='/favourites' exact component={Favourite}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
