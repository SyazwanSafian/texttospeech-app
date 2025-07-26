import { Container, Row, Col } from "react-bootstrap";
import TextToSpeechCard from "../components/TextToSpeechCard";

export default function Home() {
    return (
        <Container className="my-5">
            <TextToSpeechCard />
        </Container>
    );
}
