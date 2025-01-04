import { useState, useContext } from "react";
import axiosInstance from '../../../api/axiosConfig';
import { useAuth } from "../../login/AuthProvider";
import '../deleteItem/DeleteItem.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CompleteItem(props) {
    const [completedItem, setCompletedItem] = useState(props.item || {});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();






const notify = () =>  toast.success('Item marked for completion', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });



    const handleEditComplete = async (e) => {
        setIsLoading(true);
        setError(null);
try {
    const newData = {
        itemName: completedItem.itemName,
        wowHeadLink: completedItem.wowHeadLink,
        expansion: completedItem.expansion,
        location: completedItem.location,
        slot: completedItem.slot,
        wowheadId: completedItem.wowheadId,
        backdrops: completedItem.backdrops,
        userId: user.userId,
        completed: true
    }

        await axiosInstance.put(`/api/v1/items/${completedItem.wowheadId}`, newData)
        notify()
        props.toggle();
        
    } catch (e) {
setError("update - NOW WHAT")
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
            <h2>I have found {completedItem.itemName}</h2>
           <button type="button" onClick={handleEditComplete} disabled={isLoading}>
            {isLoading ? 'Marking for completetion...' : 'I have found this Item'}
           </button>
            {error && <p style={{color: 'red'}}> {error}</p>}
            <button type="button" onClick={props.toggle}>I am still looking for this item</button>
        </div>
    </div>
)

}