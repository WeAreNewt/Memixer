import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GoBackButton } from "../../../components/Buttons/GoBackBtn";
import PageLayout from "../../../components/Layout";
import { MemeEditControls } from "../../../components/Meme/MemeEditControls";
import { MemeEditPreview } from "../../../components/Meme/MemeEditPreview";
import { ConfirmModal } from "../../../components/Modals/Confirm";
import { FeedbackModal } from "../../../components/Modals/Feedback";
import { delay } from "../../../utils/time";

type EditMemePageProps = {
    meme: any; //Meme
}

const EditMemePage: NextPage = (props: any) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const router = useRouter();

    const handleRemixMeme = () => {
        setShowConfirm(true);
    }

    const handleConfirmation = () => {
        setShowConfirm(false);

        //TOOD Create meme here

        const createMemeService = async () => {
            await delay(1500);
            setShowFeedback(false);
            const createdMeme = { id: 2 }
            router.push(`/meme/${createdMeme.id}?created=true`);
        }

        setShowFeedback(true);
        createMemeService();
    }

    return (
        <div className='home-bg min-h-screen'>
            <Head>
                <title></title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <FeedbackModal show={showFeedback} />
            <ConfirmModal show={showConfirm} setShow={setShowConfirm} onConfirm={handleConfirmation} />
            <PageLayout>
                <Container fluid="md" className='h-full'>
                    <Row className='mb-4'>
                        <Col>
                            <GoBackButton route="/" />
                        </Col>
                    </Row>
                    <Row className='mt-auto'>
                        <Col>
                            <article className='space-y-10'>
                                <Row>
                                    <Col>
                                        <Row className='gap-6'>
                                            <Col sm="12" lg="7">
                                                <MemeEditPreview meme={props.meme} />
                                            </Col>
                                            <Col sm="12" lg="4">
                                                <MemeEditControls onRemixClicked={handleRemixMeme} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </article>
                        </Col>
                    </Row>
                </Container>

            </PageLayout>
        </div>
    )
}

export const getStaticProps = async ({ params }: any): Promise<{ props: EditMemePageProps }> => {

    //TODO retrieve memes from user with apollo

    const meme = {
        id: 1,
        src: "/assets/imgs/meme.png",
        mockProfile: {
            id: 1,
            name: "cryptopunk",
            profilePic: "/assets/imgs/punk.png"
        },
        remixCount: 210,
        publicationDate: new Date().getTime()
    }

    return {
        props: {
            meme: meme,
        }
    }

}

export async function getStaticPaths() {
    // TODO Get All the memes here to create all the static pages

    const memes = [
        {
            memeId: '1'
        },
        {
            memeId: '2'
        },
        {
            memeId: '3'
        },
        {
            memeId: '4'
        },
    ]

    return {
        paths: memes.map(meme => { return { params: { memeId: meme.memeId } } }),
        fallback: false
    }
}

export default EditMemePage
