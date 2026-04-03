"use client";
import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from './blogs';
import BlogDetails from './BlogDetails';
import './blog-details.css';
import Container from '@/components/cards/container.card';
import EmptyState from '@/components/cards/empty-state.card';

export default function BlogPage() {
    const { slug } = useParams();
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) {
        return <EmptyState title='Blog Not Found' />;
    }
    return (
        <Container>
            <BlogDetails blog={blog} />
        </Container>
    );
}