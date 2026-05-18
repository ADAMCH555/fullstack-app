import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <p>This is your personal dashboard.</p>
            </header>

            <div className="dashboard-content">
                <div className="card">
                    <h3>Profile Information</h3>
                    <div className="profile-details">
                        <div className="detail-item">
                            <span className="label">Name:</span>
                            <span className="value">{user?.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Email:</span>
                            <span className="value">{user?.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Member Since:</span>
                            <span className="value">
                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Just now"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <button className="btn-secondary">Edit Profile</button>
                        <button className="btn-secondary">Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
