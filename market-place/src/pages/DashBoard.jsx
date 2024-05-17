// eslint-disable-next-line react/prop-types
const DashBoard = ({ userData }) => {

    return (
        <div className="dashboardmain-container" >
            <p>
                Hello <span>{userData.username}</span> <span>( Log out )</span>
            </p>
            <p>
                From your account dashboard, you can view your recent orders, manage your shipping and billing addresses, handle your inventory, and update your password and account details.
            </p>
        </div>
    )
}

export default DashBoard;