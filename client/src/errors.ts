import Swal from "sweetalert2"

const handleError = (error: any, source = '') => {
    console.error(error, source)
    Swal.fire('Opps!', `Something went wrong! ${error}`, 'error')
}

export default handleError