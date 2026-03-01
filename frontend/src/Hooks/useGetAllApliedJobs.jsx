
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { APPLICANT_API_END_POINT } from "../Utils/constant";
import { setAllAppliedJobs } from "../redux/JobSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICANT_API_END_POINT}/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;