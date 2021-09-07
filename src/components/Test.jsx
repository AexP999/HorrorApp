import React, { useState } from 'react';

export default function Test () {

  const accordionContent = [];
  const [ testData ] = useState(
    [
      { type: 'color', value: 'red' },
      { type: 'name', value: 'sarah' },
      { type: 'number', value: 2 }
    ]

  );


  const accordionToggle = key => {
    const contentStyle = accordionContent[ key ].style;
    contentStyle.display === 'none' ? (contentStyle.display = 'block') : (contentStyle.display = 'none');
  };


  return (
    <div className="container">
      { testData.map(({ type, value }, key) => {
        return (
          <div key={ key }>
            <button onClick={ () => accordionToggle(key) } >
              { type }
            </button>
            <div ref={ ref => (accordionContent[ key ] = ref) } style={ { display: 'none' } }>
              { value }
            </div>
          </div>
        );
      }) }
    </div>
  );
}

