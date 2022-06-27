import { Box } from '@chakra-ui/react'
import Nav from '../components/Nav'
import GeneratePanel from '../components/Generate'
import { useAuth } from "../hooks/auth"

export default function Web() {
    const authenticated = useAuth({ redirectTo: '/login' })
    
    return (
        <Box bg='gray.700'>
            <Nav />
            <Box> 
                <GeneratePanel />
            </Box>
        </Box>
    );
}
