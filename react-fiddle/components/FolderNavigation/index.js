import React from "react";
import "./style.css";
import { folderTreeData } from "./data";
import Node from "./node.js";
console.log({ folderTreeData });

const FolderNavigator = () => {
  return (
    <div style={{ width: "40vw", margin: "auto" }}>
      <div>Folder Navigator</div>
      {folderTreeData.map((data, index) => {
        const { title = "" } = data || {};
        return <Node key={`${title}-${index}`} data={data} />;
      })}
    </div>
  );
};

export default FolderNavigator;
