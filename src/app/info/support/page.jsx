import BrodcrumpCard from '@/components/cards/broadcrump.card'
import Container from '@/components/cards/container.card'
import React from 'react'
import SupportPage from './Support'
import SocketConnectionCard from '@/components/cards/socket.connection.card'

const page = () => {
    return (
        <>
            <BrodcrumpCard data={[{ label: "Our Support", url: "/support-us" }]} title={"24/7 Support are available"} />
            <br />
            <Container>
                <SupportPage />
            </Container>
            <SocketConnectionCard />
        </>
    )
}
export default page