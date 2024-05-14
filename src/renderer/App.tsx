import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { useState } from 'react';

export default function App() {
  const [history, setHistory] = useState();

  return (
    <>
      {/* <Header/> */}
      <Sidebar />
      <Content />
    </>
  );
}
