import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import textlogo from "../assets/textlogo.png";
import StartButton from "./StartButton";
import UserMenu from "./UserMenu";
import { useAuth } from "./AuthProvider";

export default function Layout({ children }) {
    const { currentUser } = useAuth();

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Navbar variant="light" className="mb-4" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <Image
                            src={textlogo}
                            height="40"
                            className="d-inline-block align-top"
                            alt="Voiceover"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="me-auto text-center fw-bold fs-6 text-decoration-underline"
                            style={{ fontFamily: 'Arial' }}
                        >
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile Page</Nav.Link>
                        </Nav>

                        <Nav
                            className="text-center"
                            style={{ fontFamily: 'Arial' }}
                        >
                            <div>
                                {currentUser ? (
                                    <UserMenu />
                                ) : (
                                    <StartButton />
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <main className="flex-grow-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-light text-dark py-3 mt-auto">
                <Container>
                    <div className="text-left">
                        <p className="mb-0">
                            <Image
                                src={textlogo}
                                height="20"
                                className="me-2"
                                alt="Logo"
                            />
                            VoiceOver &copy; Turn your reading into listening.
                        </p>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
