import React, { useState } from "react";
const wordsLimit = 210;

export default function Question(props: any) {
  const [showMore, setShowMore] = useState(true);
  let description = "";
  if (showMore && props.description.length > wordsLimit) {
    description = props.description.substring(0, wordsLimit) + "...";
  } else {
    description = props.description;
  }
  return (
    <React.Fragment>
      <div className="single_que">
        <div className="que_title" onClick={() => setShowMore(!showMore)}>
          {props.title}
        </div>
        <div
          className="que_description"
          onClick={() => setShowMore(!showMore)}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </React.Fragment>
  );
}
