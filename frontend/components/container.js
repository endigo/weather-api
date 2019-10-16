import React from "react";

const Container = ({ children }) => (
  <>
    <main>{children}</main>
    <style jsx>{`
      main {
        max-width: 480px;
        margin: 0 auto;
      }
    `}</style>
  </>
);

export default Container;
