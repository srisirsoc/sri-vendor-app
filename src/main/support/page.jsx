import React from 'react'
import Breadcrumb from '../../components/cards/broadcrump.card'
import Container from '../../components/cards/container.card'

const SupportPage = () => {
    return (
        <>
            <Breadcrumb data={[{ label: "Our Support", url: "/support-us" }]} title={"24/7 Support are available"} />
            <br />
            <Container>
                SupportPage
            </Container>
        </>
    )
}
export default SupportPage