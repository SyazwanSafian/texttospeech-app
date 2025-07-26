import { Col, Button, Row, Modal, Form } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

export default function StartButton() {
    const { handleGoogleLogin, setEmail, setPassword, handleLogin, handleRegister, modalShow, handleClose, handleShowLogin, handleShowRegister } = useAuth();


    return (
        <div>
            <Button
                variant="primary"
                className="me-3 px-4 rounded-pill"
                onClick={handleShowLogin}
            >
                Get Started
            </Button>
            <Modal
                show={modalShow !== null}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Row>
                    <Col md={4}>
                        <h1>Image will be placed here.</h1>
                    </Col>
                    <Col>


                        <Modal.Body>
                            <h2 className="m-4 fw-bold text-center">
                                {modalShow === "register" ? "Create your account" : "Log in to your account"}
                            </h2>

                            <Form
                                className="d-grip gap-2 px-5"
                                onSubmit={modalShow === "register" ? handleRegister : handleLogin}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        onChange={(event) => setEmail(event.target.value)}
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        onChange={(event) => setPassword(event.target.value)}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>

                                <p style={{ fontSize: "12px" }}>
                                    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                                </p>

                                <Button className="rounded-pill w-100 mb-2" type="submit">
                                    {modalShow === "register" ? "Register" : "Log in"}
                                </Button>
                            </Form>

                            <hr className="my-3" />

                            <div className="text-center">
                                <p>or</p>
                                <Button variant="danger" className="rounded-pill w-100 mb-2" onClick={handleGoogleLogin}>
                                    <i className="bi bi-google"></i>
                                    Continue with Google
                                </Button>
                            </div>

                            <div className="text-center mt-3">
                                {modalShow === "register" ? (
                                    <p>
                                        Already have an account?{" "}
                                        <span
                                            style={{ color: "blue", cursor: "pointer" }}
                                            onClick={handleShowLogin}
                                        >
                                            Log in
                                        </span>
                                    </p>
                                ) : (
                                    <p>
                                        New here?{" "}
                                        <span
                                            style={{ color: "blue", cursor: "pointer" }}
                                            onClick={handleShowRegister}
                                        >
                                            Create an account
                                        </span>
                                    </p>
                                )}
                            </div>
                        </Modal.Body>
                    </Col>
                </Row>
            </Modal>


        </div >
    )
}