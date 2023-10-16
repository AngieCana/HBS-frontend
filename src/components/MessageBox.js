import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
  // a function that has props as a parameter. Returns Alert as a element and then passes props through it as a variant, OR displays 'info' as a string, and then displays the props.children
}