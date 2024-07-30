
import React, { useState } from 'react';
import { compareInvoice } from '../api';
import { toast } from 'sonner';

const InvoiceComparison = ({ onCompare }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCompare = async () => {
    if(!file){
      toast.error("Kindly Upload PDF")
      return
    }
    const result = await compareInvoice(file);
    onCompare(result);
  };

  return (
    <div className='flex flex-col'>
      <input type="file" onChange={handleFileChange}  />

      <button onClick={handleCompare} className='py-2 px-2 rounded-lg bg-gray-950 text-white  my-5' >Compare Invoice</button>
    </div>
  );
};

export default InvoiceComparison;
