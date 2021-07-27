import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useContext } from 'react';
import { EluxContextComponent } from './base';
export default React.forwardRef(({
  onClick,
  href,
  url,
  replace,
  ...rest
}, ref) => {
  const eluxContext = useContext(EluxContextComponent);
  const props = { ...rest,
    onClick: event => {
      event.preventDefault();
      onClick && onClick(event);
      replace ? eluxContext.router.replace(url) : eluxContext.router.push(url);
    }
  };

  if (href) {
    return React.createElement("a", _extends({}, props, {
      href: href,
      ref: ref
    }));
  } else {
    return React.createElement("div", _extends({}, props, {
      ref: ref
    }));
  }
});