import { useMaterialUIController } from 'context/index';

export default () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return darkMode;
};
