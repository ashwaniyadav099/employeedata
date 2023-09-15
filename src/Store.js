import {createStore} from 'redux';
import { rootreducer } from './reducer/index.js';

const mystore = createStore(
    rootreducer
)
export default mystore