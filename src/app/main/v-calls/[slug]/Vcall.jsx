"use client"
import React from 'react'
import dynamic from "next/dynamic";
const VCallMain = dynamic(() => import("@/components/vcall/vcall.main"), { ssr: false });
const VCallCard = ({ lib }) => {
    return (<VCallMain lib={lib} />)
}

export default VCallCard