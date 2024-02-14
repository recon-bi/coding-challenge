import { ScrollableFieldType } from 'types/common';
import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

interface Props {
  fields: ScrollableFieldType[];
  item: any;
  onClick?: (value: any) => void;
  bgColor?: string;
}

function ScrollableContainerItem({ bgColor, fields, item, onClick }: Props) {
  const handleClick = (value: any) => {
    if (onClick) onClick(value);
  };

  return (
    <MDBox
      display="flex"
      mb={1}
      onClick={() => handleClick(item)}
      bgColor={bgColor}
      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#b3d1f0' } }}
    >
      {fields.map((field, index: number) => {
        return (
          <MDBox {...field.containerProps} key={`scrollableContainerItem_${index}`} mr={2}>
            <MDTypography fontSize="1rem">{item[field.fieldName]}</MDTypography>
          </MDBox>
        );
      })}
    </MDBox>
  );
}

ScrollableContainerItem.defaultProps = {
  bgColor: 'white',
};

export default ScrollableContainerItem;
