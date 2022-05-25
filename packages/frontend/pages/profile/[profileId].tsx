import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import { GoBackButton } from '../../components/Buttons/GoBackBtn'
import PageLayout from '../../components/Layout'
import { ConnectionBox } from '../../components/Layout/ConnectionBox'
import { MemePreview } from '../../components/Meme/MemePreview'
import useWindowDimensions from '../../hooks/window-dimensions.hook'
import { LoginStatus } from '../../models/Connection/connection.model'
import { User } from '../../models/User/user.model'
import { removeUser } from '../../store/reducers/user.reducer'
import { getSimplifiedAddress } from '../../utils/text'

type ProfileProps = {
    profile: User;
}

const Profile: NextPage = (props: any) => {
    const { height, width } = useWindowDimensions();
    const { data } = useAccount();
    const user: User = useSelector((state: any) => state.user.selectedUser);
    const dispatch = useDispatch();

    console.log(props)

    const handleLogout = () => {
        dispatch(removeUser());
    }

    return (
        <div className='profile-bg min-h-screen'>
            <Head>
                <title></title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <PageLayout>
                <Container fluid="md">
                    <Row className='mb-4 mt-4 lg:mt-0'>
                        <Col>
                            {
                                width > 850 && user.name ?
                                    <GoBackButton route="/" />
                                    :
                                    width > 850 ? <ConnectionBox status={LoginStatus.DISCONNECTED} /> : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <article className='space-y-10 comic-border rounded-4xl n:p-5 lg:p-20 bg-white relative'>
                                <header className='border-b-2 border-gray-200 border-solid pb-6'>
                                    <div className="flex items-center comic-border-mini border-3 bg-white border-black border-solid rounded-full comic-border-mini max-w-max absolute -top-12 lg:-top-16">
                                        <Image src={props.profile?.coverPicture?.uri || "/assets/icons/profile.svg"}
                                            width={width > 850 ? "115" : "80"} height={width > 850 ? "115" : "80"} />
                                    </div>
                                    <div> {/*flex n:flex-col md:flex-row n:items-start lg:items-center lg:justify-between */}
                                        {
                                            width < 850 ?
                                                <div className='flex flex-row justify-end'>
                                                    <button onClick={handleLogout} className="comic-border-mini rounded-full bg-white py-1 px-2 max-h-14">
                                                        <Image src="/assets/icons/logout.svg" className='mt-1' width="30" height="30" />
                                                    </button>
                                                </div>
                                                : null
                                        }
                                        <Row className='justify-between items-center'>
                                            <Col>
                                                <h2 className='font-medium n:text-3xl lg:text-4xl'>{props.profile.name}</h2>
                                                <p className='font-medium n:text-sm lg:text-xs'>{getSimplifiedAddress(props.profile.address || "")} • {props.profile.posts?.length || 0} memes created</p>
                                            </Col>
                                            {
                                                width > 850 ?
                                                    <Col className='text-right'>
                                                        <button onClick={handleLogout} className="comic-border-mini rounded-full bg-white px-3 py-1 max-h-10">
                                                            <div className='flex items-center space-x-3'>
                                                                <Image src="/assets/icons/logout.svg" width="20" height="20" />
                                                                <span className='font-medium'>Log out</span>
                                                            </div>
                                                        </button>
                                                    </Col>
                                                    : null
                                            }
                                        </Row>
                                    </div>
                                </header>
                                <section>
                                    <Row className='mb-4'>
                                        <Col>
                                            <h3>MEMES CREATED</h3>
                                        </Col>
                                    </Row>
                                    <Row className='flex n:flex-col lg:flex-row justify-center n:space-y-4 lg:space-y-0'>
                                        {
                                            props.profile.posts.filter((p, i) => i < 3)
                                                .map((p, i) => (
                                                    <Col key={"prof-meme-" + i}>
                                                        <MemePreview meme={p} />
                                                    </Col>
                                                ))
                                        }
                                    </Row>
                                </section>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </PageLayout>
        </div>
    )
}

export const getStaticProps = async ({ params }: any): Promise<{ props: ProfileProps }> => {

    //TODO retrieve memes from user with apollo

    const user: User = {
        name: "cryptopunk",
        address: "0xE0Aff1C05dA6aF0e6779fB04AbB872c511CA6332",
        posts: [
            {
                id: 1,
                src: "/assets/imgs/meme.png",
                remixCount: 210,
                publicationDate: new Date().getTime()
            },
            {
                id: 2,
                src: "/assets/imgs/distracted boyfriend.png",
                remixCount: 210,
                publicationDate: new Date().getTime()
            },
            {
                id: 3,
                src: "/assets/imgs/distracted boyfriend.png",
                remixCount: 210,
                publicationDate: new Date().getTime()
            },
        ],
        stats: {}
    }

    return {
        props: {
            profile: user,
        }
    }

}

export async function getStaticPaths() {
    return {
        paths: [{ params: { profileId: '1' } }],
        fallback: false
    }
}

export default Profile