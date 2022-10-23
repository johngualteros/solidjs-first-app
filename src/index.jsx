/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import Api from './Api';

render(() => <Api />, document.getElementById('root'));
