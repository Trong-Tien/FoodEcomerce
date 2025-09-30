declare module "react-html-parser" {
  import * as React from "react";

  export interface Transform {
    (node: any, index: number): React.ReactNode;
  }

  export interface Options {
    decodeEntities?: boolean;
    transform?: Transform;
    preprocessNodes?: (nodes: any) => any;
  }

  export default function ReactHtmlParser(
    html: string,
    options?: Options
  ): React.ReactNode[];
}
