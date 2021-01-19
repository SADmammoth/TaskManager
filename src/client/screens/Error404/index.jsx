import React from "react";
import { Helmet } from "react-helmet";
import textVariants from "../../atomics/TextBlock/textVariants";
import TextBlock from "../../atomics/TextBlock/TextBlock";

export default function Error404(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
      </Helmet>
      <TextBlock variant={textVariants.h1}>404</TextBlock>
    </>
  );
}
