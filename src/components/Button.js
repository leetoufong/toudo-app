import React, {useState} from 'react';
import './Button.scss';

export default function Button(props) {
  const [variant] = useState(props.variant);
  const [title] = useState(props.title);
  const [event] = useState(props.event);

  return (
    <button onClick={event} className={`${variant}-btn btn`} title={title}>{props.children}</button>
  )
}
