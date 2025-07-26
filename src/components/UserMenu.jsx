import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

export default function UserMenu() {
    const { handleLogout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="outline-secondary"
                className="rounded-pill px-4 fw-bold"
                id="user-menu-dropdown"
            >
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow">
                <Dropdown.Item href="#edit-profile">Edit Profile</Dropdown.Item>

                <Dropdown.Item onClick={toggleDarkMode}>
                    Dark Mode: {darkMode ? "On" : "Off"}
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                    as={Button}
                    variant="danger"
                    onClick={handleLogout}

                >
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
