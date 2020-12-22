import dva from 'dva'
import App from './App';
import cart from './models/cart'
import products from './models/products'
import { createBrowserHistory as createHistory } from 'history'

const app = dva({
    history: createHistory()
});
app.router(() => <App />);
app.model(products);
app.model(cart);
app.start("#root");