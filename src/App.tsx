import Main from './Main';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faFloppyDisk, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrash, faFloppyDisk, faChevronRight, faUpload)

function App() {
  return (
    <div className="App">
      <Main></Main>
    </div>
  );
}

export default App;
