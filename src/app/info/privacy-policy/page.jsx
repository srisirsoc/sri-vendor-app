import BrodcrumpCard from '@/components/cards/broadcrump.card'
import Container from '@/components/cards/container.card'
import React from 'react'
import PrivacyPolicy from './About'
import SocketConnectionCard from '@/components/cards/socket.connection.card'

const page = () => {
    return (
        <>
            <BrodcrumpCard data={[{ label: "Privacy Policy", url: "/info/privacy-policy" }]} title={"How We Protect Your Data"} />
            <br />
            <Container>
                <PrivacyPolicy />
            </Container>
            <SocketConnectionCard />
        </>
    )
}
export default page
