import { Link as RouterLink } from 'react-router-dom';

export default function Link({ href, to, ...props }) {
  return <RouterLink to={href || to || '/'} {...props} />;
}
