import React from 'react'
import Container from '../../components/cards/container.card'
import Breadcrumb from '../../components/cards/broadcrump.card'

const BlogDetailsPage = () => {
    return (
        <>
            <Breadcrumb data={[{ label: "Our Support", url: "/support-us" }]} title={"24/7 Support are available"} />
            <br />
            <Container>
                BlogDetailsPage
            </Container>
        </>
    )
}
export default BlogDetailsPage