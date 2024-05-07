import React, { useState } from "react";
import LeafNode from "./leafNode.js";

const Node = ({ data = {} }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { title = "", child = [] } = data || [];
  if (child.length === 0) {
    console.log({ data, title });
    return <LeafNode title={title} />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "4px",
          padding: "2px",
          textAlign: "left",
        }}
      >
        <div
          className="node-title"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onClick={() => setIsOpened((open) => !open)}
        >
          <div># {title}</div>
          <div
            style={{
              transform: !isOpened ? "rotate(90deg)" : "rotate(-90deg)",
              marginLeft: "4px",
              transition: "transform 0.5s",
            }}
          >{`>`}</div>
        </div>
        {isOpened && (
          <div
            style={{
              marginLeft: "4px",
              paddingLeft: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {child.map((childData, index) => {
              return <Node key={index} data={childData} />;
            })}
          </div>
        )}
      </div>
    );
  }
};

export default Node;
