import { useState, useContext } from "react";
import axiosInstance from '../../../api/axiosConfig';
import { useAuth } from "../../login/AuthProvider";
import './DeleteItem.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function DeleteItem(props) {
    const [deletedItem, setDeletedItem] = useState(props.item || {});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth;






const notify = () =>  toast.success('Item Deleted', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });



    const handleDelete = async (e) => {
        setIsLoading(true);
        setError(null);
try {


        await axiosInstance.delete(`/api/v1/items/${deletedItem.wowheadId}`)
        notify()
        props.toggle();
        
    } catch (e) {
setError("DELETION FAILED - NOW WHAT")
toast.error("Error deleting item :( ")
console.error(e)
    } finally {
        setIsLoading(false);
    }
}


return(
    <div className="popup">
         <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"/>
        <div className="popup-inner">
            <h2>Delete {deletedItem.itemName}</h2>
           <button type="button" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
           </button>
            {error && <p style={{color: 'red'}}> {error}</p>}
            <button type="button" onClick={props.toggle}>Cancel</button>
        </div>
    </div>
)

}