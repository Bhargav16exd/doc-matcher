// src/App.jsx

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import InvoiceComparison from './components/InvoiceComparison';
import ResultDisplay from './components/ResultDisplay';
import { uploadInvoice } from './api';

const App = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [compareResult, setCompareResult] = useState(null);

  const handleUpload = async (file) => {
    const response = await uploadInvoice(file);
  };

  const handleCompare = (result) => {
    setCompareResult(result);
  };

  return (
    <div className='h-screen w-screen px-4'>
    
      <div className='flex justify-center items-center font-extrabold text-5xl py-4'>
        Invoice Management System
      </div>


    <div className='flex flex-col  justify-center items-center '>

      <div className='w-full bg-slate-300 rounded-xl mx-5 my-4'>
        <div className='font-mono text-2xl flex justify-center items-center py-4 b'>
            Upload Invoice in Database
        </div>
        <div className='font-mono text-xl flex justify-center items-center py-4 h-[10%] my-5 flex-col  '>
            <FileUpload onUpload={handleUpload} />
        </div>
      </div>


      <div className='w-full bg-slate-200 rounded-xl my-4'>
        <div className='font-mono text-2xl flex justify-center items-center py-4 '>
            Upload Invoices to be compared 
        </div>
        <div className='font-mono text-xl flex justify-center items-center py-4 h-[10%] my-5 '>
           <InvoiceComparison onCompare={handleCompare} />
        </div>
      </div>
    </div>

     
      <ResultDisplay result={compareResult} />


    </div>
  );
};

export default App;
