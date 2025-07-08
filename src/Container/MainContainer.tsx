import React from "react";
import { ReactNode } from "react";

interface Props{
    children:ReactNode
}
const MainContainer = ({children}:Props) => {
  return (
    <div>{children}</div>
  )
}

export default MainContainer
