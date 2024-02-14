import { formatDate } from "lib/utils/dates";

const columns = [
  {
    Header: 'Hotel name',
    accessor: 'hotel.name',
  },
  {
    Header: 'Country',
    accessor: 'hotel.country',
  },
  {
    Header: 'City name',
    accessor: 'hotel.city',
  },
  {
    Header: 'Check In Date',
    accessor: 'checkIn',
    Cell: (props: any) => formatDate(props.row.original.checkIn)
  },
  {
    Header: 'Check Out Date',
    accessor: 'checkOut',
    Cell: (props: any) => formatDate(props.row.original.checkOut)
  },
  {
    Header: 'Duration',
    accessor: 'duration',
  },
  {
    Header: 'Price',
    accessor: 'totalPrice',
  },
];

export default columns;
