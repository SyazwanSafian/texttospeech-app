import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export default function TextToSpeechCard() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);
    const URL = import.meta.env.VITE_API_BASE_URL;

    const handleConvert = async () => {
        if (!currentUser) {
            alert("You must be logged in to use the service.");
            return;
        }
        if (!text.trim() && !file) {
            alert("Please enter text or upload a file.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("userId", currentUser.uid);

            if (text.trim() !== "") {
                formData.append("text", text);
            } else if (file) {
                formData.append("file", file);
            }

            const response = await axios.post(`${URL}/convert`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setAudioUrl(response.data.audioUrl);
        } catch (error) {
            console.error("Conversion error:", error);
            alert(error?.response?.data?.error || "Conversion failed");
        } finally {
            setLoading(false);
        }
    };



    return (
        <Row className="my-5">
            <Col md={9} className="mx-auto">
                <Card className="shadow p-4">
                    <Form>
                        {/* Text Input */}
                        <Form.Group
                            className="mb-3"
                            controlId="textInput"

                        >
                            <Form.Label>Enter text</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={text}
                                rows={5}
                                placeholder="Type or paste your text here..."
                                onChange={(event) => setText(event.target.value)}
                                disabled={file !== null}
                            />
                        </Form.Group>

                        {/* File Upload */}
                        <Form.Group
                            className="mb-3"
                            controlId="fileUpload"

                        >
                            <Form.Label>Or upload a file</Form.Label>
                            <Form.Control
                                type="file"
                                ref={fileInputRef}
                                onChange={(event) => setFile(event.target.files[0])}
                                disabled={text !== ""}

                            />
                        </Form.Group>

                        {/* Convert Button */}
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                type="button"
                                onClick={handleConvert}
                                disabled={loading}
                            > {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"></span>
                                    Converting...
                                </>
                            ) : (
                                "Convert"
                            )}
                            </Button>
                        </div>

                        {/* Reset Button */}
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    setText("");
                                    setFile(null);
                                    setAudioUrl(null);
                                    if (fileInputRef.current)
                                        fileInputRef.current.value = "";
                                }}>
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Card>

                {/* playback area */}
                {audioUrl && (
                    <Alert variant="success" className="text-center mt-4">
                        <p>Conversion successful!</p>
                        <audio controls src={audioUrl} className="w-100" />
                    </Alert>
                )}
            </Col >
        </Row >
    );
}
