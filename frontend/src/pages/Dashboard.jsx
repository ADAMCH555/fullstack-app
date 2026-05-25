import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
        setError("");
        setSuccess("");
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const updateData = { name, email };
            if (password) {
                updateData.password = password;
            }
            await updateProfile(updateData);
            setSuccess("Profile updated successfully!");
            setIsEditing(false);
            setPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <p>This is your personal dashboard.</p>
            </header>

            <div className="dashboard-content">
                <div className="card">
                    <h3>Profile Information</h3>
                    
                    {success && (
                        <div className="success-alert" style={{ 
                            background: "rgba(16, 185, 129, 0.1)", 
                            borderLeft: "4px solid var(--success-color)", 
                            color: "#a7f3d0", 
                            padding: "1rem", 
                            borderRadius: "4px", 
                            marginBottom: "1.5rem", 
                            fontSize: "0.875rem" 
                        }}>
                            {success}
                        </div>
                    )}
                    {error && <div className="error-alert">{error}</div>}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-details">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    minLength={6}
                                />
                            </div>
                            <div className="action-buttons" style={{ marginTop: "1rem" }}>
                                <button type="submit" className="btn-primary btn-sm">Save Changes</button>
                                <button type="button" className="btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    ) : (
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
                    )}
                </div>

                <div className="card">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        {!isEditing ? (
                            <button className="btn-secondary" onClick={handleEdit}>Edit Profile</button>
                        ) : (
                            <button className="btn-secondary" onClick={handleCancel}>Cancel Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
