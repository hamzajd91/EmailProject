import React from 'react';

const Suggestions = (props:any) => {
  const { results } = props;
  const options = results.map((r:any, key:any) => (
    <li key={key.toString()}>
      {r}
    </li>
  ));
  return <div><ul>{options}</ul></div>;
};

export default Suggestions;
