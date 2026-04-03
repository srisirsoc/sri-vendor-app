"use client";
import React from 'react';
import EmptyState from '../components/cards/empty-state.card';

export default function NotFound() {
    return (
        <div>
            <EmptyState title='Page not found!' />
        </div>
    );
}
