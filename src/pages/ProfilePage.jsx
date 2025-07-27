import { Container, Row, Col, Card } from "react-bootstrap";
import TextToSpeechCard from "../components/TextToSpeechCard";
import History from "../components/History";

export default function ProfilePage() {
    return (
        <>
            <h1>Welcome, user.</h1>
            <Container className="my-5">
                <History />
            </Container>
            <Container className="my-5">
                <TextToSpeechCard />
            </Container>
        </>
    );
}
