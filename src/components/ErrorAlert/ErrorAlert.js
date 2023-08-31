import { FiAlertTriangle } from 'react-icons/fi';
import './ErrorAlert.scss';

const ErrorAlert = (props) => {
  return (
    <div className="error">
      <FiAlertTriangle className="error__icon" />
      <p>{props.errorMsg}</p>
    </div>
  );
};

export default ErrorAlert;