import { Container } from "react-bootstrap";
import hero_tts from "../assets/hero_tts.gif"

export default function Home() {
    return (
        <>
            {/* Hero GIF Full Width */}
            <div style={{ padding: "20px" }}>
                <img
                    src={hero_tts}
                    alt="Text to Speech Animation"
                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                />
            </div>
            <Container className="my-5">
                <h1>About Us</h1>
                <h4>
                    VoiceOver is a website build by Syazwan Safian on July 2025. He was inspired to do this to help him memorize some important notes.
                    VoiceOver offers a text to speech conversion for free but with limited characters. Sometimes you just want to put on your earphone and listen
                    to something thats not music, nor a podcast but helps with your self development. You can input a snippet of your favourite things to hear,
                    such as "Good job on your workout today!". This is just an example of how this can be useful, with more ways to utilize this website.
                </h4>
            </Container>
        </>
    );
}
