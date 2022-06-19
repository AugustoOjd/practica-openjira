import { FC } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import {NavBar, Sidebar} from "../ui";

interface props {
    title?: string;
    children: any
}

export const Layout:FC <props> =({title = 'OpenJira', children})=>{
    
    return (
        <Box sx={{ flexFlow: 1}}>
            <Head>
                <title>{title}</title>
            </Head>
        <NavBar></NavBar>
        <Sidebar></Sidebar>
        
            <Box sx={{padding: '10px 20px' }}>
                {children}
            </Box>
        </Box>
    
    )
}