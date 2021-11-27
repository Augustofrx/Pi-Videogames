import { createStore, applyMiddleware } from 'redux';
import { composeWhitDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


export const store = createStore(rootReducer, composeWhitDevTools(applyMiddleware(thunk)));
