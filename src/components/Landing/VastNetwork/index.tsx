import React from "react";

import "./index.scss";

// function VastNetwork() {
//   return (
//     <section className="vast-network">
//       <div className="left-section">
//         <h3 className="section-title">
//       “A vast network of IT Firms looking to serve your needs”
//         </h3>

//         <div>
//       We connect local businesses with IT Firms that have the correct
//       proficiencies required for their IT needs.
//         </div>
//       </div>

//       <div className="section-body">
//         <iframe
//           src="https://www.youtube.com/embed/smytdFRhmq8?rel=0&modestbranding=1"
//           title="how hindsyght works"
//           frameBorder="0"
//           allowFullScreen
//           width="700px"
//           height="400px"
//         />
//       </div>
//     </section>
//   );
// }

function VastNetwork() {
  return (
    <section className="vast-network">
      <div className="container">
        <h4>“A vast network of IT Firms looking to serve your needs”</h4>
        <article>
          We connect local businesses with IT Firms that have the correct proficiencies required for their IT needs.
        </article>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="video-section">
                <iframe
                  width="100%"
                  height="525"
                  src="https://www.youtube.com/embed/MUSMK4tigTg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VastNetwork;
