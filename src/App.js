import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "@apollo/client";
import { cache } from "./cache";

import { BrowserRouter, Routes, Route}
    from 'react-router-dom';
import Home from './Home';
import About from './About';
import Conditional from './Conditional';
import Multistep from './Multistep';
import MultistepModal from './MultistepModal';
import Thing from './Thing';
import Things from './Things';

import { Stack, StackItem } from '@fluentui/react';

import './App.css';
import NavBar from './NavBar';

const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql"
});

function App() {

  // The conditional we are checking to see whether or not
  // we should show our conditional page.
  const [firstTime, setFirstTime] = React.useState(true);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Stack horizontal>
          <NavBar />
          <StackItem style={{padding: `1rem 2rem`}}>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About/>} />
                <Route exact path='/things' element={<Things />} />
                <Route path='/things/:id' element={<Thing />} />
                <Route path='/conditional' element={<Conditional firstTime={firstTime} setFirstTime={setFirstTime}/>} />
                <Route path='/multistep' element={<Multistep firstTime={firstTime} setFirstTime={setFirstTime}/>} />
                <Route path='/multistepmodal' element={<MultistepModal firstTime={firstTime} setFirstTime={setFirstTime}/>} />
            </Routes>
          </StackItem>
        </Stack>
      </BrowserRouter>
    </ApolloProvider>
 )
}
  
export default App;
