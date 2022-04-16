
export function GET_PRODUCTS (state, payload) {
    if(!localStorage.getItem('products')){
      localStorage.setItem('products', JSON.stringify(payload));
      state.products = payload.reverse();
    } else {
        state.products = JSON.parse(localStorage.getItem('products')).reverse();
    }
}
