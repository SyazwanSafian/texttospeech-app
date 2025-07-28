import { useState, useEffect } from "react";
import { Dropdown, Button, Image } from "react-bootstrap";
import { useAuth } from "./AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function UserMenu() {
    const { currentUser, handleLogout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [displayName, setDisplayName] = useState("");

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!currentUser) return;

            const profileRef = doc(db, "users", currentUser.uid, "profile", "info");
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
                const data = profileSnap.data();
                setPhotoURL(data.photoURL || null);
                setDisplayName(data.displayName || currentUser.email);
            } else {
                setDisplayName(currentUser.email);
            }
        };

        fetchProfileData();
    }, [currentUser]);

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="outline-secondary"
                className="rounded-pill px-3 d-flex align-items-center gap-2"
                id="user-menu-dropdown"
            >
                {photoURL ? (
                    <Image
                        src={photoURL}
                        roundedCircle
                        width="30"
                        height="30"
                        alt="User"
                    />
                ) : (
                    <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "30px", height: "30px", fontSize: "14px" }}>
                        {displayName?.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="fw-bold">{displayName}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow">
                <Dropdown.Item as={Link} to="/profile">Profile Page</Dropdown.Item>
                <Dropdown.Item as={Link} to="/edit-profile">Edit Profile</Dropdown.Item>
                <Dropdown.Item onClick={toggleDarkMode}>
                    Dark Mode: {darkMode ? "On" : "Off"}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Button} variant="danger" onClick={handleLogout}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
