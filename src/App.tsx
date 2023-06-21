import React from 'react';
import logo from './logo.svg';
import Main from './Main';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrash, faFloppyDisk)

function App() {
  return (
    <div className="App bg-dark_back">
      <Main></Main>
    </div>
  );
}

export default App;
