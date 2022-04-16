import { REQUEST } from '../../Request';

export const getProducts = async ({commit}, payload) => {
    let response = await REQUEST('/index', 'get');
        commit('GET_PRODUCTS' ,response.data);
}

export const createProduct = async ({dispatch}, payload) => {
       check()
       let prods = JSON.parse(localStorage.getItem('products'));
       prods.push({id: prods.length+1, ...payload});
       console.log(prods);
       localStorage.setItem('products', JSON.stringify(prods));
       dispatch('getProducts');
}

export const updateProduct = async ({dispatch}, payload) => {
    console.log(payload);
    let prods = JSON.parse(localStorage.getItem('products'));
    if(prods && prods.length === 0) {
        console.log("No item found")
    } else {
        for(let i = 0; i<prods.length; i++) {
            if(prods[i].id === payload.id) {
                prods[i].name = payload.body.name;
                prods[i].description = payload.body.description;
                prods[i].logo = payload.body.logo;
            }
        }
        console.log(prods)
        localStorage.setItem('products', JSON.stringify(prods));
    }

    dispatch('getProducts');
}

export const deleteProduct = async ({dispatch}, id) => {
    let prods = JSON.parse(localStorage.getItem('products'));
    if(prods && prods.length === 0) {
        console.log("No item found")
    } else {
        for(let i = 0; i<prods.length; i++) {
            if(prods[i].id === id) {
                prods.splice(prods.indexOf(prods[i]), 1)
            }
        }
        localStorage.setItem('products', JSON.stringify(prods));
    }

    dispatch('getProducts');
}

function check() {
    if(!localStorage.getItem('products')) {
        localStorage.setItem('products', '');
    }
}