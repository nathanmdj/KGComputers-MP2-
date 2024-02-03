import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function ErrorAlert({onHideAlert}) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    // Call the onHideAlert function passed from the parent
    onHideAlert();
  };

  if (show) {
    return (
      <Alert variant="danger" onClose={handleClose} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }
  return null;
}

export default ErrorAlert;