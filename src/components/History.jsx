import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

export default function History() {
    const [conversions, setConversions] = useState([]);
    const { currentUser } = useAuth();
    const URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchConversions = async () => {
            if (!currentUser)
                return;

            const userConversionsRef = collection(db, "users", currentUser.uid, "conversions")
            const snapshot = await getDocs(userConversionsRef);

            const results = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setConversions(results)
        };

        fetchConversions()
    }, [currentUser]);

    const handleDelete = async (conversionId) => {
        const confirm = window.confirm("Are you sure you want to delete this conversion?");
        if (!confirm) return;

        try {
            const response = await axios.delete(
                `${URL}/conversions/${currentUser.uid}/${conversionId}`
            );

            if (response.data.success) {
                setConversions(prev => prev.filter(c => c.id !== conversionId));
                alert("Conversion deleted successfully.");
            } else {
                alert("Failed to delete conversion.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <Container>
            <Row className="my-5">
                {conversions.map((conv) => (
                    <Col md={4} key={conv.id}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <Card.Title>{conv.inputType === "text"
                                    ? `Text Input`
                                    : `Uploaded File: ${conv.originalFileName}`}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{conv.createdAt?.toDate().toLocaleString()}
                                </Card.Subtitle>
                                <Card.Text>{conv.text.length > 200
                                    ? conv.text.slice(0, 200) + "..."
                                    : conv.text}
                                </Card.Text>
                                <audio controls className="w-100" src={conv.audioUrl} />
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDelete(conv.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}


