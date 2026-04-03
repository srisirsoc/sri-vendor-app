import Container from '@/components/cards/container.card'
import React from 'react'
import AboutPage from './About'
import SocketConnectionCard from '@/components/cards/socket.connection.card'

const page = () => {
    return (
        <>
            <Container>
                <AboutPage />
            </Container>
            <SocketConnectionCard />
        </>
    )
}
export default page
