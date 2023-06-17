import React from 'react';
import logo from './logo.svg';
import Main from './Main';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrash)

function App() {
  return (
    <div className="App bg-dark_back">
      <Main></Main>
    </div>
  );
}

export default App;
