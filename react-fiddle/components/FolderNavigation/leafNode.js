import React from "react";

const LeafNode = (props) => {
  const { title = "" } = props;
  console.log({ props, title });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "4px",
        padding: "2px",
        textAlign: "left",
      }}
    >
      <span> * </span>
      <span> {title} </span>
    </div>
  );
};

export default LeafNode;
