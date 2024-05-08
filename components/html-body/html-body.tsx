"use client";
import React from "react";
import ReactQuill from "react-quill";
import "../html-body/html-body.css";

type Props = {
  body: string;
};

const HtmlBody = (props: Props) => {
  return <ReactQuill  value={props.body} readOnly={true} theme={"bubble"} />;
};

export default HtmlBody;
