import Breadcrumb from '@/components/cards/broadcrump.card'
import Container from '@/components/cards/container.card'
import React from 'react'
import { blogs } from './[slug]/blogs'
import BlogCard from '@/components/blog/blog-card';

const page = () => {

    return (
        <>
            <Breadcrumb urls={["blog", "Our Blogs"]} title={"Our Blogs"} />
            <section className="section blog-section">
                <Container>
                    <h2 className="section-title text-center">Latest Blog & Tips</h2>
                    <p className="section-desc text-center">
                        Stay updated with our latest tips, guides, and service news.
                    </p>
                    <div className="blog-list-container">
                        {blogs?.map((x, i) => (<BlogCard key={i} blog={x} />))}
                    </div>
                </Container>
            </section>


        </>
    )
}
export default page