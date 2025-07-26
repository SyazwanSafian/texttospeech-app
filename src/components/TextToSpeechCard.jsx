import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

export default function TextToSpeechCard() {
    return (
        <Row className="my-5">
            <Col md={9} className="mx-auto">
                <Card className="shadow p-4">
                    <Form>
                        {/* Text Input */}
                        <Form.Group className="mb-3" controlId="textInput">
                            <Form.Label>Enter text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Type or paste your text here..."
                            />
                        </Form.Group>

                        {/* File Upload */}
                        <Form.Group className="mb-3" controlId="fileUpload">
                            <Form.Label>Or upload a file</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        {/* Convert Button */}
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="button">
                                Convert
                            </Button>
                        </div>
                    </Form>
                </Card>

                {/* Placeholder for playback */}
                <Alert variant="secondary" className="text-center mt-4">
                    Converted text to audio
                </Alert>
            </Col>
        </Row>
    );
}
