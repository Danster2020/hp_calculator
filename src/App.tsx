import Main from './Main';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faFloppyDisk, faChevronRight, faUpload } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faPlus, faTrash, faFloppyDisk, faChevronRight, faUpload, faGithub)

function App() {
  return (
    <div className="App">
      <Main></Main>
    </div>
  );
}

export default App;
