import BaseUrls from '../utils/endPoints';
import ApiController from './controller';
const controller = new ApiController();

export const getUserApiData = async offset => {
  const finalUrl = `${BaseUrls.USERBASEURL}/sample-data/users?limit=10&offset=${offset}`;
  controller.config.method = 'GET';
  try {
    const response = await controller.getAxios(finalUrl);

    if (response != null) {
      return JSON.stringify(response);
    }
  } catch (error) {
    console.log('error fetching data', error);
  }
};

///get user auth data from api
export const getUserAuthData = async () => {
  const finalUrl = `${BaseUrls.AUTHBASEURL}/vHjyLY/data`;
 
  controller.config.method = 'GET';
  try {
    const response = await controller.getAxios(finalUrl);
    if (response != null) {
      console.log('ress', response);
      return response;
    }
  } catch (error) {
    console.log('error');
  }
};

///post user auth data to api
export const postUserAuthData = async userData => {
  const finalUrl = `${BaseUrls.AUTHBASEURL}/vHjyLY/data`;
  controller.config = userData;
  try {
    const response = await controller.postAxios(finalUrl);
    if (response != null) {
      console.log('ress', response);
      return response;
    }
  } catch (error) {
    console.log('error');
  }
};

///update user data
export const updateUserAuthData = async (userId, userData) => {
  const finalUrl = `${BaseUrls.AUTHBASEURL}/vHjyLY/data/${userId}`;
  controller.config = userData;
  try {
    const response = await controller.updateAxios(finalUrl);
    if (response != null) {
      console.log('ress', response);
      return response;
    }
  } catch (error) {
    console.log('error');
  }
};

///search user auth data from api
export const searchUserAuthData = async emailId => {
  const finalUrl = `${BaseUrls.AUTHBASEURL}/vHjyLY/data`;

  controller.config.params = {
    email: emailId,
  };
  try {
    const response = await controller.getAxios(finalUrl);
    if (response != null) {
      console.log('ress', response);
      return response;
    }
  } catch (error) {
    console.log('error');
  }
};
