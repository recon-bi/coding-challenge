import DataCard from "common/DataCard";
import CommonModal from "common/Modal/Modal"
import { formatDate } from "lib/utils/dates";
import React, { ChangeEvent } from "react"
import MDBox from "ui/MDBox";
import MDButton from "ui/MDButton";
import MDInput from "ui/MDInput";
import MDTypography from "ui/MDTypography";
import BookingsModel from "models/bookings.model";
import dayjs from "dayjs";
import Swal from "sweetalert2";

interface Props { 
  selectedItem: any;
  selections: any;
  showModal: boolean;
  onClose: () => void;
}

function BookingForm({ showModal, selectedItem, selections, onClose }: Props) {
  const [open, setOpen] = React.useState(false)
  const [customer, setCustomer] = React.useState({customerName: '', phone:'', email:''})

  const handleBook = () => {
    const modelInstance = BookingsModel.getInstance()
    const { startDate, endDate } = selections
    const duration = dayjs(endDate).diff(dayjs(startDate), 'days')
    console.log(selections)
    const newBooking = {
      ...{
        checkIn: selections.startDate,
        checkOut: selections.endDate,
        duration,
        totalPrice: duration * selectedItem.price
      },
      ...{customer},
      ...{ hotel: selectedItem }
    }
    console.log(newBooking)
    modelInstance.create(newBooking)
    Swal.fire("Booked!", "You're all set", "success")
    onClose()
  }

  const handleComponentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomer({
      ...customer,
      [name]: value
    })
  }

  React.useEffect(() => {
    setOpen(showModal)
  }, [showModal])

  return (
    <CommonModal showModal={open} onModalClose={onClose} cssOverrides={{width:600}}>
      <MDBox>
        <DataCard title="Selected Hotel">
          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Hotel Name
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDTypography fontSize="1rem" >
                {selectedItem && selectedItem.name}
              </MDTypography>
            </MDBox>
          </MDBox>
          
          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Check in date:
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDTypography fontSize="1rem" >
                {selections && formatDate(selections.startDate)}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Check out date:
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDTypography fontSize="1rem" >
                {selections && formatDate(selections.endDate)}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Your name:
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDInput name="customerName" onChange={handleComponentChange} />
            </MDBox>
          </MDBox>

          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Phone:
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDInput name="phone" onChange={handleComponentChange}/>
            </MDBox>
          </MDBox>

          <MDBox display="flex" mt={2}>
            <MDBox >
              <MDTypography fontSize="1rem" fontWeight="bold">
                Email:
              </MDTypography>
            </MDBox>
            <MDBox ml={2}>
              <MDInput name="email" onChange={handleComponentChange}/>
            </MDBox>
          </MDBox>
        </DataCard>
        <MDBox display="flex" mt={2}>
          <MDButton onClick={handleBook}>Book Now</MDButton>
          </MDBox>
      </MDBox>
    </CommonModal>
  )
}

export default BookingForm