import { Button } from "ui"
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import GlobalContext from '../utils/global-context'
import Nav from '../components/Nav'
import GeneratePanel from '../components/Generate'

export default function Web() {
    return (
        <ChakraProvider>
            <Box bg='gray.700'>
                <Nav />
                <Box> 
                    <GeneratePanel />
                </Box>
            </Box>
        </ChakraProvider>
    );
}
