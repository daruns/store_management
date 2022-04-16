import axios from 'axios';

export const REQUEST = async (resource, method, payload, noToken) => {
   if(navigator.onLine){
     try {
      let response = null;
      if(noToken) 
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`, method === 'post' ? payload : undefined);
      else if(method === 'get' || method === 'delete')
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`);
      else 
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`, payload);
      return response.data
     }catch(err) {
       console.log("Something went wrong!")
      return {error: true, ...err.response.data};
     }
  }else{  
    console.log('No internet connection is available!', 'error');
    return {
      success:false,
      message: 'No internet connection is available!',
      data: null
    }
  }
}
