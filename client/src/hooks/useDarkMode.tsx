import { useMaterialUIController } from 'context/ThemeContext';

export default () => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return darkMode;
};
