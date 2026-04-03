import BrodcrumpCard from '@/components/cards/broadcrump.card'
import Container from '@/components/cards/container.card'
import React from 'react'
import TermsOfUse from './About'
import SocketConnectionCard from '@/components/cards/socket.connection.card'

const page = () => {
    return (
        <>
            <BrodcrumpCard data={[{ label: "Terms and Conditions", url: "/info/terms-of-use" }]} title={"Terms of Use"} />
            <br />
            <Container>
                <TermsOfUse />
            </Container>
            <SocketConnectionCard />
        </>
    )
}
export default page
