import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) {
    return <div>No result to display</div>;
  }

  return (

      <div className='w-full h-atuo bg-slate-200 rounded-xl my-4 flex flex-col'>
        <div className='font-mono text-2xl flex flex-col justify-center items-center py-4 '>
            Most Similar Invoice
          <div className='font-mono text-xl flex justify-center items-center py-4 my-5 '>
            Filename: {result.most_similar_invoice_filename}
          </div>
          <div className='font-mono text-xl flex justify-center items-center py-4 h-[30%]  '>
              Overall Similarity Score: {result.overall_similarity_score}
          </div>
        </div>
      </div>
  );
};

export default ResultDisplay;
