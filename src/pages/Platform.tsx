import React, { FunctionComponent, PropsWithChildren } from "react";

const Platform: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div>this is the {children} page</div>;
};

export default Platform;
