import { useState, useEffect } from 'react';
import { getUserPlans } from './api/userPlans';
import Nav from "./components/Navbar";

export default function UserPlans() {
    const [userPlans, setUserPlans] = useState([]);

    useEffect(() => {
        const userID = sessionStorage.getItem("userID")
        getUserPlans(userID).then((data) => {
            console.log(data);
            setUserPlans(data.data);
        });
    }, []);

    const mapppedUserPlans = userPlans.map((plan) => {
        return (
            <div>
                <pre>{plan.dietPlan}</pre>
                <pre>{plan.trainingPlan}</pre>
            </div>
        )
    })

    return(
        <div>
            <Nav />
            <pre>{mapppedUserPlans}</pre>
        </div>

    )
}
    