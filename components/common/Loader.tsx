import { BeatLoader } from 'react-spinners';

function Loader({ color = '#ffffff', size = 5 }) {
  return <BeatLoader color={color} size={size} />;
}

export default Loader;
