import {toast} from "sonner"

const BASE_URL = 'http://127.0.0.1:8000';

export const uploadInvoice = async (file) => {
  try {

    const formData = new FormData();
  
    formData.append('file', file);

    if(!formData){
      toast.error("Kindly upload PDF")
      return
    }
  
    const response =  fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
  
    toast.promise(response,{
      loading:"Uploading Document",
       success:"Document Uploaded Successfully"
    })


    return  (await response).json();

  } catch (error) {
     //toast.error(error)
  }

};

export const compareInvoice = async (file) => {

  try {

    const formData = new FormData();
    formData.append('file', file);

    if(!formData){
     // toast.message("hi")
      return ;
    }
  
    const response =  fetch(`${BASE_URL}/compare-invoice`, {
      method: 'POST',
      body: formData,
    });
    
    toast.promise(response,{
      loading:"Uploading Document",
       success:"Document Uploaded Successfully"
    })
    return  (await response).json();

  } catch (error) {
   // toast.error('Error')
  }
};
