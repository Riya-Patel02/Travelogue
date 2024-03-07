import axios from 'axios';

class ApiController {
  config = {
    method: '',
    params:{}
  };

  getAxios(finalUrl) {
    console.log('url', finalUrl);
    return new Promise((resolve, reject) => {
      axios
        .get(finalUrl, this.config)
        .then(response => {
          
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          reject(error);
        });
    });
  }

  postAxios = (finalUrl) => {
    return new Promise((resolve, reject) => {
      axios
        .post(finalUrl, this.config)
        .then(response => {
    
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          reject(error);
        });
    });
  };

  updateAxios = (finalUrl) => {
    return new Promise((resolve, reject) => {
      axios
        .put(finalUrl, this.config)
        .then(response => {
    
          resolve(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          reject(error);
        });
    });
  };

}

export default ApiController;
