import MDBox from 'ui/MDBox';
import MDTypography from 'ui/MDTypography';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row: { original, index } }: any) => {
      const hotelImageIndex = index % 15;
      const hotelImage = `/images/hotel_pics/hotel${hotelImageIndex}.webp`;
      return (
        <MDBox display="flex">
          <MDBox overflow="hidden" borderRadius="10px" height={100}>
            <img src={hotelImage} alt={`Hotel Image ${hotelImageIndex}`} height={100} width={100} />
          </MDBox>

          <MDBox ml={2} width={250}>
            <MDTypography variant="h5">{original.name}</MDTypography>
            <MDTypography variant="h6">{original.country}</MDTypography>
            <MDTypography variant="h6">{original.city}</MDTypography>
          </MDBox>

          <MDBox ml={2}>
            <MDTypography fontSize="1rem">{original.phone}</MDTypography>
            <MDTypography fontSize="1rem">{original.email}</MDTypography>
            <MDTypography variant="h5">£{original.price}pp</MDTypography>
          </MDBox>
        </MDBox>
      );
    },
  },
];

export default columns;
