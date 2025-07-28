import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import { useAuth } from "../components/AuthProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function EditProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const { currentUser } = useAuth();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleDeletePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const displayName = `${firstName} ${lastName}`.trim();
        const profileRef = doc(db, "users", currentUser.uid, "profile", "info");
        let photoURL = null;

        if (photo) {
            const storageRef = ref(storage, `profilePhotos/${currentUser.uid}`);
            await uploadBytes(storageRef, photo);
            photoURL = await getDownloadURL(storageRef);
        }
        await setDoc(profileRef, { displayName, phone, ...(photoURL && { photoURL }) }, { merge: true });

        alert("Profile update submitted!");
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card className="shadow-sm rounded-4">
                        <Card.Body>
                            <h4 className="mb-4">Account Settings</h4>

                            <div className="text-center mb-3">
                                <div
                                    className="rounded-circle bg-warning d-inline-flex justify-content-center align-items-center"
                                    style={{ width: "100px", height: "100px", fontSize: "36px", color: "white" }}
                                >
                                    {photoPreview ? (
                                        <Image
                                            src={photoPreview}
                                            alt="Preview"
                                            roundedCircle
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : (
                                        "M"
                                    )}
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        id="profilePhoto"
                                        onChange={handlePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="profilePhoto">
                                        <Button variant="outline-secondary" size="sm" as="span">
                                            Browse
                                        </Button>
                                    </label>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-2"
                                        onClick={handleDeletePhoto}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="phone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </Form.Group>

                                    </Col>
                                </Row>
                                <div className="text-start">
                                    <Button variant="success" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
