import { Container } from "react-bootstrap";
import TextToSpeechCard from "../components/TextToSpeechCard";
import History from "../components/History";
import { useAuth } from "../components/AuthProvider";

export default function ProfilePage() {
    const { currentUser } = useAuth();

    return (
        <>
            <h2>Welcome{currentUser?.email ? `, ${currentUser.email}` : ""}.</h2>
            <Container className="my-5">
                <TextToSpeechCard />
            </Container>

            <Container className="my-5">
                <h2>Your past conversions</h2>
                <History />
            </Container>
        </>
    );
}
