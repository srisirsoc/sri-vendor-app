import React from 'react';

const Image = ({ src, alt, width, height, style = {}, ...rest }) => (
  <img src={src} alt={alt || ''} width={width} height={height} style={style} {...rest} />
);

export default Image;
