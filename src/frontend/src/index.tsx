import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { createAppStore } from './logic/AppStore';
import { createChatLayoutStore } from './logic/ChatLayoutStore';

ReactDOM.render(<App store={createAppStore(createChatLayoutStore([]))}/>, document.querySelector('#root'));