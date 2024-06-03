// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";

declare module "react" {
  type FCX<P = object> = FunctionComponent<P & { className?: string }>;
}
