import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export default function TextToSpeechCard() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("");

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

            if (selectedVoice) {
                formData.append("voiceName", selectedVoice);
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
                            <Form.Group className="mb-3" controlId="languageSelect">
                                <Form.Label>Select Language</Form.Label>
                                <Form.Select
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        const lang = e.target.value;
                                        setSelectedLanguage(lang);
                                        setSelectedVoice(""); // reset voice when language changes
                                    }}
                                >
                                    <option value="">-- Choose Language --</option>
                                    <option value="en-US">English (US)</option>
                                    <option value="en-GB">English (UK)</option>
                                    <option value="ms-MY">Malay (Malaysia)</option>
                                    <option value="ja-JP">Japanese</option>
                                    <option value="fil-PH">Filipino (Philippines)</option>
                                    {/* Add more as needed */}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="voiceSelect">
                                <Form.Label>Select Voice</Form.Label>
                                <Form.Select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    disabled={!selectedLanguage}
                                >
                                    <option value="">-- Choose Voice --</option>
                                    {/* Example voices for en-US */}
                                    {selectedLanguage === "en-US" && (
                                        <>
                                            <option value="en-US-Wavenet-D">Wavenet D (Male)</option>
                                            <option value="en-US-Wavenet-F">Wavenet F (Female)</option>
                                        </>
                                    )}
                                    {selectedLanguage === "en-GB" && (
                                        <>
                                            <option value="en-GB-Wavenet-A">Wavenet A (Male)</option>
                                            <option value="en-GB-Wavenet-B">Wavenet B (Female)</option>
                                        </>
                                    )}
                                    {selectedLanguage === "ms-MY" && (
                                        <>
                                            <option value="ms-MY-Standard-A">Standard A (Female)</option>
                                        </>
                                    )}
                                    {selectedLanguage === "ja-JP" && (
                                        <>
                                            <option value="ja-JP-Wavenet-A">Wavenet A (Female)</option>
                                            <option value="ja-JP-Wavenet-B">Wavenet B (Male)</option>
                                        </>
                                    )}
                                    {selectedLanguage === "fil-PH" && (
                                        <>
                                            <option value="fil-PH-Wavenet-A">Wavenet A (Female)</option>
                                            <option value="fil-PH-Wavenet-B">Wavenet B (Male)</option>
                                        </>
                                    )}

                                </Form.Select>
                            </Form.Group>
                            <Form.Control
                                as="textarea"
                                value={text}
                                rows={5}
                                placeholder="Convert your text here.."
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
                                variant="danger"
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
