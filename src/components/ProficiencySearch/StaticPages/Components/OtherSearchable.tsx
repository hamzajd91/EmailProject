import React from "react";

function OtherSearchable(props: any) {
  const {otherkeywords} = props;

  function generateBlock(data: any) {
    return (
      <>
        <ul className="w-100">
          <li style={{listStyle: "none"}}>
            {data.map((_keyboard: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {_keyboard.link ? (
                    <>
                      {/* <Link to={`/proficiency/${_keyboard.url}`}> */}
                      <div>{_keyboard.name}</div>
                      {/* </Link> */}
                    </>
                  ) : (
                    <React.Fragment>
                      <ul className="w-100">
                        <li style={{listStyle: "disc"}}>
                          <h6>{_keyboard.name}</h6>
                          {_keyboard.sub.length != 0 ? generateBlock(_keyboard.sub) : null}
                        </li>
                      </ul>
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            })}
          </li>
        </ul>
      </>
    );
  }

  return (
    <React.Fragment>
      {otherkeywords.length !== 0 ? (
        <div className="container search_list">
          <h4 className="mb-3 mt-4">Other related Searchable keywords</h4>
          <div className="row">
            {otherkeywords.map((keyboard: any, index: number) => {
              return (
                <div className="col-md-4 mt-2 mb-2" key={index}>
                  <ul className="w-100">
                    <li style={{listStyle: "none"}}>
                      {keyboard.link ? (
                        <>
                          {/* <Link to={`/proficiency/${keyboard.url}`}> */}
                          <div>{keyboard.name}</div>
                          {/* </Link> */}
                        </>
                      ) : (
                        <React.Fragment>
                          <ul className="w-100">
                            <li style={{listStyle: "none"}}>
                              <h6>{keyboard.name}</h6>
                              {keyboard.sub.length != 0 ? generateBlock(keyboard.sub) : null}
                            </li>
                          </ul>
                        </React.Fragment>
                      )}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default OtherSearchable;
