import { 
    Box, 
    ChakraProvider, 
    Heading,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import Nav from '../components/Nav'

export default function Login() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')



    const handleLogin = () => {
        
        console.log('[>>] logging in')
    }

    return (
        <ChakraProvider>
            <Box bg='gray.700' height='100vh'>
                <Nav />

                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    height='100vh'
                >
                    <Box 
                        bg='gray.800' 
                        w='55%'
                        h='45%' 
                        borderRadius='15px' 
                        minHeight='400px'
                        maxWidth='600px'
                        minWidth='350px'
                        boxShadow='dark-lg'
                    >
                        <Heading as='h3' color='white' textAlign='center' mt='4'>
                            Login
                        </Heading>
                
                        {/* LOGIN FORM */}
                        <AuthForm 
                            setUsername={setUsername}
                            username={username}
                            setPassword={setPassword}
                            password={password}
                            submit={handleLogin}
                        />
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    )    
}
