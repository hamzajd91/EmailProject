import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as fillStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

export default function Stars(props: any) {
  return (
    <>
      {Array.apply(null, Array(props.whole)).map(function(item, i) {
        return (
          <span className="star_color" key={i}>
            <FontAwesomeIcon  className="icon full" icon={fillStar} />
          </span>
        );
      })}
      {props.half ? (
        <span className="star_color">
          <FontAwesomeIcon className="icon half" icon={faStarHalfAlt} />
        </span>
      ) : (
        ""
      )}
      {Array.apply(null, Array(props.empty)).map(function(item, i) {
        return (
          <span className="star_color" key={i}>
            <FontAwesomeIcon className="icon empty" icon={emptyStar} />
          </span>
        );
      })}
    </>
  );
}
